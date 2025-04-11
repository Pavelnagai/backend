const { validationResult } = require('express-validator');

const { User } = require('../models');

exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Email уже используется' });
      }
  
      const user = await User.create({ name, email, password });
      const token = generateToken(user.id);
      
      return res.status(201).json({ 
        user: { id: user.id, name: user.name, email: user.email },
        token
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};