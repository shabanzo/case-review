require('dotenv').config();
import config from 'config';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

import authController from './app/auth/auth.controller';
import userController from './app/user/user.controller';
import { connectMongoDb } from './utils/mongodb';

const app: Application = express();
const port = config.get<number>('port') || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// app.use(
//   cors({
//     origin: config.get<string>('origin'),
//     credentials: true,
//   })
// );

app.use('/ping', (_req: Request, res: Response) => {
  res.send(200);
});
app.use('/api/users', userController);
app.use('/api/auth', authController);

// Connect to MongoDB
connectMongoDb();

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
