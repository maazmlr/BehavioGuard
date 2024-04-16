import jwt from 'jsonwebtoken'
import config from '../../config.js';

function createSecretToken(id, email, username) {
    return jwt.sign({ 
        id, 
        email,
        username
    }, config.SECRET_KEY);
};


export default createSecretToken