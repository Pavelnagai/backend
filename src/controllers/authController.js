const { User } = require('../models');
const { generateToken } = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const token = generateToken(user.id);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};