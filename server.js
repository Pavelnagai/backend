const express = require('express');
const app = express();
const PORT = 3000;

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const postRoutes = require('./src/routes/post.routes');
app.use('/api', postRoutes);

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
