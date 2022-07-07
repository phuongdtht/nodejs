const express = require('express');
const router = express.Router();

const HomeController = require('../app/controllers/admin/HomeController');
const AdminAuthController = require('../app/controllers/admin/AdminAuthController');
const UserController = require('../app/controllers/admin/UserController');
const { validateRegisterUser } = require('../app/validator/user');
const authAdmin = require('../app/middleware/authAdmin')

router.get('/login', AdminAuthController.signIn);
router.post('/login', AdminAuthController.login);

router.get('/dashboard', authAdmin, HomeController.dashboard);

router.get('/users', authAdmin, UserController.index);
router.get('/users/create', authAdmin, UserController.create);
router.post('/users/create', authAdmin, validateRegisterUser(), UserController.store);
router.get('/users/:id/edit', authAdmin, UserController.edit);
router.put('/users/:id', authAdmin, UserController.update);
router.patch('/users/:id/restore', authAdmin, UserController.restore);
router.delete('/users/:id', authAdmin, UserController.destroy);
router.delete('/users/:id/force', authAdmin, UserController.forceDestroy);
router.get('/users/:id', authAdmin, UserController.show);

module.exports = router;
