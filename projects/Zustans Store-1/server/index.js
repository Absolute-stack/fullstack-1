import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import { productRouter } from './routes/productRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  return res.status(200).send(`<h1>Server Is Working<h1/>`);
});

app.use('/api/products', productRouter);

app.listen(5000, () => console.log('✅Server running on Port:5000'));
