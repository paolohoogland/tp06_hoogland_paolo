const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors');

const users = require('../models/users');
const configJSON = require('../config.json');
const JWT_SECRET = configJSON.jwtSecret;

const corsOptions = {
  origin: "*",
  methods: 'POST',
  allowedHeaders: 'Content-Type, Authorization',
  exposedHeaders: 'Authorization'
};


router.get('/', cors(corsOptions), (req, res) => {
  res.send(users);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  });
});

module.exports = router;
