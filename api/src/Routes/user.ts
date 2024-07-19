import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import UserModel from '../../models/user';

dotenv.config();

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY as string;

router.use(cookieParser());

router.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    // If user is already present in the database or not
    const isUserPresent = await UserModel.findOne({ email: email });

    if (isUserPresent) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user if not present in the database
    const userDoc = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: bcrypt.hashSync(password, salt),
    });

    res.status(201).json({ user: userDoc, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // If user is not present in the database
  const isUserPresent = await UserModel.findOne({ email })

  if (!isUserPresent) {
    return res.status(400).json({ message: 'User not found' });
  }

  // If password is not matching
  const isPasswordValid = bcrypt.compareSync(password, isUserPresent.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Create a token and send it to the user
  const tokenPayLoad = {
    id: isUserPresent._id,
    firstName: isUserPresent.firstName,
    lastName: isUserPresent.lastName,
    email: isUserPresent.email,
    phoneNumber: isUserPresent.phoneNumber,
    message: "Logged in"
  }

  try {
    const token = jwt.sign(tokenPayLoad, secret, {})
    res.cookie("token", token, { httpOnly: true, secure: true }).json(tokenPayLoad)
  } catch (err) {
    res.status(500).json({ message: "Internal server error" + err });
  }
});

router.get('/profile', (req: Request, res: Response) => {
  const { token } = req.cookies; // Get token from the cookies

  // If token is not present in the cookies
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token and send the user data to the client
  jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(decoded);
  })
})

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out" }); // Clear the token from the cookies
})

export default router;