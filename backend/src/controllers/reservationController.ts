import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import User from '../models/User';
import { Op } from 'sequelize';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, tableNumber, reservationTime } = req.body;
    const formattedReservationTime = new Date(reservationTime).toISOString();

    const existingReservations = await Reservation.count({
      where: { reservation_time: formattedReservationTime },
    });

    if (existingReservations >= 5) {
      return res.status(400).json({ error: 'No available tables for this time slot' });
    }

    const newReservation = await Reservation.create({
      user_id: userId,
      table_number: tableNumber,
      reservation_time: formattedReservationTime,
    });

    res.status(201).json(newReservation);
  } catch (error) {
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
