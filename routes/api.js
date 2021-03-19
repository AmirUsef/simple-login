const express = require('express');
const router = express.Router();

const login = require('./login');
const register = require('./register');
const profile = require('./profile');

router.use('/login', login)
router.use('/register', register)
router.use('/profile', profile)

module.exports = router;