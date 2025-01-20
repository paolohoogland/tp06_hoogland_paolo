const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require ("uuid");

const SECRET_KEY = 'HELLOHELLOHELLO';
const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        issuedAt: Date.now()
    };

    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    return { accessToken, refreshToken };
};

exports.getUsers = (req, res) => {
    // res.send(users);
    Utilisateurs.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            });
        });
}

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    Utilisateurs.findOne({ where: { username: username } })
    .then(async data => {
      if (data) {
        return res.status(400).json({ message: 'username already exists.' });
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    Utilisateurs.findAll({ order: [['id', 'DESC']] }).then(data => {
        let userId = 1;
        if (data.length > 0) {
          userId = parseInt(data[0].id) + 1;
        }
        Utilisateurs.create({ id: userId, username: username, pass: hashedPassword });
        res.status(201).json(
          {
            message: 'User created successfully.',
          });
      }
      ).catch(err => {
        res.status(500).json({ message: err.message || 'An error occurred while creating the user.' });
      });
    }
    ).catch(err => {
      res.status(500).json({ message: err.message || 'An error occurred while creating the user.' });
    });
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    Utilisateurs.findOne({ where: { username: username } })
        .then(async data => {
            if (!data) {
                return res.status(401).json({ error: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, data.pass);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const user = {
                id: data.id,
                username: data.username
            }

            const { accessToken, refreshToken } = generateToken(user);
            res.json({ message: 'User logged in successfully', accessToken, refreshToken });
        })
        .catch(err => {
            res.status(500).json({ message: err.message || 'An error occurred while logging in.' });
        });
}

exports.updateUser = async (req, res) => {
    const { username, password } = req.body;
    const userId = req.user.id; 

    try {
        const user = await Utilisateurs.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (username) user.username = username;
        if (password) user.pass = await bcrypt.hash(password, 10);

        await user.save();

        res.status(200).json({
            message: 'User updated successfully.',
            user: {
                id: user.id,
                username: user.username,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'An error occurred while updating the user.' });
    }
};
