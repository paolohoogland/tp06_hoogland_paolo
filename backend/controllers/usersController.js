const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/users');

const configJSON = require('../config.json');
const JWT_SECRET = configJSON.jwtSecret;

const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        issuedAt: Date.now()
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    return { accessToken, refreshToken };
};

exports.getUsers = (req, res) => {
    res.send(users);
}

exports.login = async (req, res) => { // check async
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const { accessToken, refreshToken } = generateAccessToken(user);
    res.json({ accessToken, refreshToken });
}

exports.register = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword
    };

    users.push(newUser);
    res.json({ message: 'User created successfully' });
}

exports.update = async (req, res) => {
    const { username, password } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username || user.username;
        user.password = await bcrypt.hash(password, 10);

        res.json({ message: 'User updated successfully' });
    });
}