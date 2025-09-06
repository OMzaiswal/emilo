import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { userRoutes } from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});