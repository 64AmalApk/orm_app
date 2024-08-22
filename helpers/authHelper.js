const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const jwtSecretKey = process.env.JWT_SECRET;
const encryptSecretKey = process.env.ENCRYPT_SECRET;

// Helper function to generate JWT token
function generateToken(payload) {
    const { id, email, role, username, phoneNumber, gender, dob, hobbies, address } = payload;
    const token = jwt.sign({ id, email, role }, jwtSecretKey, { expiresIn: '1d' });
    return { id, email, role, username, phoneNumber, gender, dob, hobbies, address, token };
}

// Helper function to encrypt a string
function encryptString(text) {
    return crypto.AES.encrypt(text, encryptSecretKey).toString();
}

// Helper function to decrypt an encrypted string
function decryptString(encryptedText) {
    return crypto.AES.decrypt(encryptedText, encryptSecretKey).toString(crypto.enc.Utf8);
}

module.exports = { generateToken, encryptString, decryptString };
