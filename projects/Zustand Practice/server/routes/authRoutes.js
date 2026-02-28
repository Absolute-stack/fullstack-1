import express from 'express';
import { protect } from '../middleware/protect.js';
import {
  getMe,
  login,
  logout,
  refresh,
  register,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/refresh', refresh);
authRouter.post('/logout', logout);
authRouter.get('/me', protect, getMe);

export default authRouter;
