"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body; // Type assertion for body properties
        const newUser = await User_1.default.create({ name, email });
        res.status(201).json(newUser);
    }
    catch (error) { // Catch error with 'any' type
        res.status(400).json({ error: error.message });
    }
});
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) { // Catch error with 'any' type
        res.status(500).json({ error: error.message });
    }
});
// TODO: Additional user routes (e.g., update, delete)
exports.default = router; // Use ES6 export syntax
