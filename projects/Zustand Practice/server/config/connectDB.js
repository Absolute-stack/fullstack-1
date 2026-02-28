import 'dotenv/config';
import mongoose from 'mongoose';

export async function connectDB() {
  const DB = process.env.DB;
  if (!DB) throw new Error('ENV file doesnt contain DB');
  try {
    mongoose.connection.on('connected', () => {
      console.log(`MongoDB successfully connected`);
    });
    await mongoose.connect(DB);
  } catch (error) {
    console.log(error);
  }
}
