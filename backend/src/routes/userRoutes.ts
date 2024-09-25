import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email }: { name: string; email: string } = req.body; // Type assertion for body properties
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error: any) { // Catch error with 'any' type
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error: any) { // Catch error with 'any' type
    res.status(500).json({ error: error.message });
  }
});

// TODO: Additional user routes (e.g., update, delete)

export default router; // Use ES6 export syntax
