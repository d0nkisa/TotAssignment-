"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User_1.default.create({ name, email });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create user' });
    }
};
exports.createUser = createUser;
