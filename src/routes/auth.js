const express = require('express');
const auth = require('../app/middleware/auth');
const { validateLogin } = require('../app/validator/login')
const router = express.Router();

const authController = require('../app/controllers/AuthController');

// router.get('/:slug', newsController.show);
router.post('/login', validateLogin(), authController.login);
router.get('/logout', auth, authController.logout);
router.get('/sign-in', authController.signIn);
module.exports = router;
