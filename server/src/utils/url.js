require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


module.exports = {
 ALLOWED_ORIGINS, DATABASE_URL, JWT_EXPIRES_IN, JWT_SECRET, PORT
};
