const express = require('express');
const router = express.Router();

const HomeController = require('../app/controllers/admin/HomeController');
const AdminAuthController = require('../app/controllers/admin/AdminAuthController');
const authAdmin = require('../app/middleware/authAdmin')

router.get('/login', AdminAuthController.signIn);
router.post('/login', AdminAuthController.login);

router.get('/dashboard', authAdmin, HomeController.dashboard);


module.exports = router;
