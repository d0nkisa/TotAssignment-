import express, { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import { Op } from 'sequelize';

const router = express.Router();

// Create a new reservation
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, reservationTime, tableNumber }: { userId: number; reservationTime: string; tableNumber: number } = req.body;

    const newReservation = await Reservation.create({ user_id: userId, table_number: tableNumber, reservation_time: reservationTime });

    res.status(201).json(newReservation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get reservations within a date range
router.get('/', async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  const start = Array.isArray(startDate) ? startDate[0] : startDate; 
  const end = Array.isArray(endDate) ? endDate[0] : endDate;

  try {
    const reservations = await Reservation.findAll({
      where: {
        reservation_time: {
          [Op.gte]: start,
          [Op.lte]: end  
        }
      }
    });
    res.status(200).json(reservations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
