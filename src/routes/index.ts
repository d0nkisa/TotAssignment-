import express from 'express';
import usersRouter from './userRoutes';
import reservationsRouter from './reservationsRoutes';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/reservations', reservationsRouter);

export default router;