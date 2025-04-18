const { verifyToken } = require('../services/auth.service');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Токен отсутствует');

    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Неавторизованный запрос' });
  }
};