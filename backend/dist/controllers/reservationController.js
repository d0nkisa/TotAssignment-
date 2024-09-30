"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservations = exports.createReservation = void 0;
const Reservation_1 = __importDefault(require("../models/Reservation"));
const User_1 = __importDefault(require("../models/User"));
const sequelize_1 = require("sequelize");
const createReservation = async (req, res) => {
    try {
        const { userId, tableNumber, reservationTime } = req.body;
        const formattedReservationTime = new Date(reservationTime).toISOString();
        const existingReservations = await Reservation_1.default.count({
            where: { reservation_time: formattedReservationTime },
        });
        if (existingReservations >= 5) {
            return res.status(400).json({ error: 'No available tables for this time slot' });
        }
        const newReservation = await Reservation_1.default.create({
            user_id: userId,
            table_number: tableNumber,
            reservation_time: formattedReservationTime,
        });
        res.status(201).json(newReservation);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create reservation' });
    }
};
exports.createReservation = createReservation;
const getReservations = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }
        const reservations = await Reservation_1.default.findAll({
            where: {
                reservation_time: {
                    [sequelize_1.Op.between]: [start, end],
                },
            },
            include: [User_1.default],
        });
        res.status(200).json(reservations);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to fetch reservations' });
    }
};
exports.getReservations = getReservations;
