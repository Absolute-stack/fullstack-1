import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import { connectDB } from './config/connectDB.js';

const PORT = process.env.API_PORT;
const app = express();

app.use(cors());
app.use(cookieParser());

await connectDB();

app.get('/', (req, res) => {
  return res.status(200).send('<h1>API is running</h1>');
});

app.get('/ping', (req, res) => {
  return res.success(200).json({ success: true, message: 'API is Running' });
});

app.use('/api/auth', authRouter);
app.listen(PORT, () => console.log(`API Port listening on: ${PORT}`));
