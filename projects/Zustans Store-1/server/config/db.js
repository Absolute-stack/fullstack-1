import 'dotenv/config';
import mongoose from 'mongoose';

export async function connectDB() {
  const db_URL = process.env.DB;
  if (!db_URL) throw new Error('db_url is missing from .env');
  try {
    mongoose.connection.on('connected', () =>
      console.log(`🏦MongoDB is connected`),
    );
    await mongoose.connect(db_URL);
  } catch (error) {
    console.error(error);
  }
}
