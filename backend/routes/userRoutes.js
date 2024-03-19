import express from 'express';
import { registerUser, loginUser, getUserData } from '../controllers/UserController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:email', getUserData);

export default router;
