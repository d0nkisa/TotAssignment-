"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const sequelize_1 = require("sequelize");
const router = express_1.default.Router();
// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const { userId, date, time, tableNumber } = req.body; // Type assertion for body properties
        const newReservation = await Reservation_1.default.create({ userId, date, time, tableNumber });
        res.status(201).json(newReservation);
    }
    catch (error) { // Catch error with 'any' type
        res.status(400).json({ error: error.message });
    }
});
// Get reservations within a date range
router.get('/', async (req, res) => {
    const { startDate, endDate } = req.query;
    // Type assertion for query parameters
    const start = Array.isArray(startDate) ? startDate[0] : startDate;
    const end = Array.isArray(endDate) ? endDate[0] : endDate;
    try {
        const reservations = await Reservation_1.default.findAll({
            where: {
                date: {
                    [sequelize_1.Op.between]: [start, end] // Use Sequelize operator for range query
                }
            }
        });
        res.status(200).json(reservations);
    }
    catch (error) { // Catch error with 'any' type
        res.status(500).json({ error: error.message });
    }
});
// TODO: Additional reservation routes
exports.default = router;
