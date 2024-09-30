import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import User from '../models/User';
import { Op } from 'sequelize';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, tableNumber, reservationTime }: { userId: number; tableNumber: number; reservationTime: string } = req.body;

    const reservationStartTime = new Date(reservationTime);
    const reservationEndTime = new Date(reservationStartTime.getTime() + 60 * 60 * 1000);

    const conflictingReservations = await Reservation.findOne({
      where: {
        table_number: tableNumber,
        reservation_time: {
          [Op.or]: [
            { [Op.between]: [reservationStartTime, reservationEndTime] },
          ]
        }
      }
    });

    if (conflictingReservations) {
      return res.status(400).json({ error: 'The table is already booked or the time is overlapping with another reservation.' });
    } else {
      const newReservation = await Reservation.create({
        user_id: userId,
        table_number: tableNumber,
        reservation_time: reservationStartTime,
      });
      res.status(201).json(newReservation);
    }
  } catch (error: any) {
    res.status(400).json({ error: 'Unable to create reservation' });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const reservations = await Reservation.findAll({
      where: {
        reservation_time: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [User],
    });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch reservations' });
  }
};
