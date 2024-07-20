import express, { Request, Response, Application, urlencoded } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './Routes/user';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // To parse the JSON data
app.use(cookieParser()) // To parse the cookies
app.use(urlencoded({ extended: true })); // To parse the form data
app.use(cors({
  origin: 'http://localhost:5173', // To allow the frontend to send the cookies
  credentials: true, // To allow the cookies to be sent from the server
}))

mongoose.connect(process.env.CLUSTER_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error);
});

app.use('/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});