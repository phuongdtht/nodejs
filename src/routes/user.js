const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');


router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', userController.store);
router.get('/:id/edit', userController.edit);
router.put('/:id', userController.update);
router.patch('/:id/restore', userController.restore);
router.delete('/:id', userController.destroy);
router.delete('/:id/force', userController.forceDestroy);
router.get('/:id', userController.show);

module.exports = router;
