const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

// router.get('/:slug', newsController.show);
router.post('/login', authController.login);
router.get('/sign-in', authController.signIn);
module.exports = router;
