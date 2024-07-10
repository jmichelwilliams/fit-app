import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import {
  addProgram,
  deleteProgram,
  getAllProgramsForUser,
  getProgram,
  updateProgram,
} from './api/program_handlers';
import {
  getAllWorkoutsForUser,
  addWorkout,
  deleteWorkout,
} from './api/workout_handlers';
import { errorHandler } from './middleware/error_handler';
import cors, { CorsOptions } from 'cors';

// Configure environment variables
dotenv.config({ path: '../.env' });

const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://fitapp/users',
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
});
const allowedOrigins = [
  'https://localhost:3000',
  'https://fit-app-weld.vercel.app',
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
};
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

app.use(cors(corsOptions));
// Routes
app.get('/programs/user/:userId', checkJwt, getAllProgramsForUser);
app.get('/programs/:programId', checkJwt, getProgram);
app.put('/programs/:programId', checkJwt, updateProgram);
app.post('/programs/:userId', checkJwt, addProgram);
app.delete('/programs/:programId', checkJwt, deleteProgram);
app.get('/workouts/:userId', checkJwt, getAllWorkoutsForUser);
app.post('/workouts/:userId', checkJwt, addWorkout);
app.delete('/workouts/:workoutId', checkJwt, deleteWorkout);
// Error Handling Middleware
app.use(errorHandler);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'This is not what you are looking for!',
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
