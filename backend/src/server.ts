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

// Configure environment variables
dotenv.config({ path: '../.env' });

const cors = require('cors');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://localhost:8000/user',
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: 'https://localhost:3000' }));

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
