import express from 'express';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes';
import reservationRoutes from './routes/reservationsRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test DB Connection and Start Server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // Ensures all models are synced
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });