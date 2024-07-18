import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './Routes/user';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());

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