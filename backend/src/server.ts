import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import { getUserById, getAllProgramsForUser } from './api/user_handlers';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const cors = require('cors');

const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'http://localhost:8000/user',
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.get('/user/:userId', checkJwt, getUserById);
app.get('/user/:userId/programs', checkJwt, getAllProgramsForUser);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'This is not what you are looking for!',
  });
});
app.listen(8000, () => {
  console.log('Server is running!');
});
