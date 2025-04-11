const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', userController.register);
router.get('/users', userController.getAllUsers);
router.get('/profile', authMiddleware, userController.getProfile);



module.exports = router;