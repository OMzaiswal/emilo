import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));

const port = process.env.PORT || 5000;

app.use('/auth', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});