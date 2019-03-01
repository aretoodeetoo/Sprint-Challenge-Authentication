const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const jwtSecret = process.env.JWT_SECRET;
  
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  db('users')
    .insert(user)
    .then(res => {
      res.status(200).json({ message: 'User registered!'});
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to register user.'});
    })
}

async function login(req, res) {
  // implement user login
  const verify = req.body;
  const user = await db('users')
    .where({ username: verify.username })
    .first();
  if (user && bcrypt.compareSync(verify.password, user.password)) {
    const token = createToken(user);
    res.status(200).json({ message: 'Log in successful!', token });
  } else {
    res.status(401).json({ message: 'Incorrect username or password '});
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
