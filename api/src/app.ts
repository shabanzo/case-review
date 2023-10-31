require('dotenv').config();
import config from 'config';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

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

// Connect to MongoDB
connectMongoDb();

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
