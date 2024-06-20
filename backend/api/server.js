import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import createSecretToken from '../Services/secretKeyGenerater.js';
import verifySecretToken from '../Services/verifySecretKey.js';
import CodeDecoder from '../Services/decoder.js'
import uploadImage from '../Services/clouFunc.js';
import multer from 'multer';

const app = express();
const upload = multer();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
const PORT = process.env.PORT || 5000;

// Handle preflight OPTIONS requests
app.options('*', cors());

// Initialize SQLite database inside an async function
(async () => {
  try {
    // Connect to SQLite database
    const db = await open({
      filename: 'user_data.db',
      driver: sqlite3.Database, // Use sqlite3.Database as the driver
    });

    // Create users table if not exists
    await db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      uid TEXT,
      email TEXT,
      name TEXT
    )`);

    // API endpoint for user signup
    app.post('/api/signup', async (req, res) => {
      const { uid, email, name } = req.body;

      // Insert user data into SQLite database
      try {
        await db.run('INSERT INTO users (uid, email, name) VALUES (?, ?, ?)', [uid, email, name]);
        
        res.status(200).json({ message: 'User signed up successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/api/signin', async (req, res) => {
      const { email, uid } = req.body;

      // Check if user exists in database by email and uid
      const user = await db.get('SELECT * FROM users WHERE email = ? AND uid = ?', [email, uid]);

      if (!user) {
        return res.status(401).json({ error: 'Invalid user' });
      }
      const token = createSecretToken(user.uid, user.email, user.name)

      // User authenticated successfully
      res.status(200).json({ message: 'User signed in successfully', user, token });
    });

    app.get('/getUser', async (req, res) => {
      try {
        const token = req.headers['token'];
        const decode = verifySecretToken(token);

        if (decode) {
          const { id } = CodeDecoder(token);
          const uid = id
          // Fetch user data from the database using UID
          const user = await db.get('SELECT * FROM users WHERE uid = ?', [uid]);

          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

          // User data fetched successfully
          res.status(200).json({ message: 'User data fetched successfully', user });
        }
      } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
      }
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
})();
