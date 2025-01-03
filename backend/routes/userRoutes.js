// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const cors = require('cors');

// const users = require('../models/users');
// const configJSON = require('../config.json');
// const JWT_SECRET = configJSON.jwtSecret;

// const corsOptions = {
//   origin: "*",
//   methods: 'POST',
//   allowedHeaders: 'Content-Type, Authorization',
//   exposedHeaders: 'Authorization'
// };


// router.get('/', cors(corsOptions), (req, res) => {
//   res.send(users);
// });

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(u => u.username === username);
//   if (!user) {
//     return res.status(401).json({ error: 'User not found' });
//   }

//   bcrypt.compare(password, user.password, (err, isMatch) => {
//     if (err) return res.status(500).json({ error: 'Server error' });
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
//       expiresIn: '1h'
//     });

//     console.log('JWT Token:', token);
//     res.json({ token });
//   });
// });

// router.post('/register', (req, res) => {
//   const { username, password } = req.body;

//   const existingUser = users.find(u => u.username === username);
//   if (existingUser) {
//     return res.status(400).json({ error: 'User already exists' });
//   }

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) return res.status(500).json({ error: 'Server error' });

//     const newUser = {
//       id: users.length + 1,
//       username,
//       password: hashedPassword
//     };

//     users.push(newUser);

//     res.status(201).json({ message: 'User registered successfully' });
//   });
// });

// router.put('/update', (req, res) => {
//   const { username, password } = req.body;
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });

//     const user = users.find(u => u.id === decoded.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.username = username || user.username;

//     if (password) {
//       bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) return res.status(500).json({ message: 'Password hashing failed' });
//         user.password = hashedPassword;
//         res.json({ message: 'User updated successfully' });
//       });
//     } else {
//       res.json({ message: 'User updated successfully' });
//     }
//   });
// });


// module.exports = router;


const { verifyToken } = require('../middleware/authMiddleware');

module.exports = app => {
  const usersController = require('../controllers/usersController');

  let router = require('express').Router();

  router.get('/', verifyToken, usersController.getUsers);
  router.post('/login', usersController.login);
  router.post('/register', usersController.register);
  router.put('/update', verifyToken, usersController.update);

  app.use('/api/users', router);
}