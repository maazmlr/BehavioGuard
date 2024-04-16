import jwt from 'jsonwebtoken'
import config from '../../config.js';


function verifySecretToken(token) {
    return jwt.verify( token , config.SECRET_KEY);
}

export default verifySecretToken