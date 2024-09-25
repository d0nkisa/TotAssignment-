import express, { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import { Op } from 'sequelize';

const router = express.Router();

// Create a new reservation
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, date, time, tableNumber }: { userId: number; date: string; time: string; tableNumber: number } = req.body; // Type assertion for body properties
    const newReservation = await Reservation.create({ userId, date, time, tableNumber });
    res.status(201).json(newReservation);
  } catch (error: any) { // Catch error with 'any' type
    res.status(400).json({ error: error.message });
  }
});

// Get reservations within a date range
router.get('/', async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  // Type assertion for query parameters
  const start = Array.isArray(startDate) ? startDate[0] : startDate; 
  const end = Array.isArray(endDate) ? endDate[0] : endDate;

  try {
    const reservations = await Reservation.findAll({
      where: {
        date: {
          [Op.between]: [start, end] // Use Sequelize operator for range query
        }
      }
    });
    res.status(200).json(reservations);
  } catch (error: any) { // Catch error with 'any' type
    res.status(500).json({ error: error.message });
  }
});

// TODO: Additional reservation routes

export default router;
