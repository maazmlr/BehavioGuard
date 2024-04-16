import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import createSecretToken from '../Services/secretKeyGenerater.js';

const app = express();
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
      filename: 'project_database.db',
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
        const token = createSecretToken(uid, email, name)
        res.status(200).json({ message: 'User signed up successfully', token });
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

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
})();
