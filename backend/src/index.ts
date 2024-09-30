import express from 'express';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes';
import reservationRoutes from './routes/reservationsRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });