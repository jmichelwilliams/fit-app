import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import { getUserById, getAllProgramsForUser } from './src/api/user_handlers';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

app.get('/user/:userId', getUserById);
app.get('/user/:userId/programs', getAllProgramsForUser);
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'This is not what you are looking for!',
  });
});
app.listen(8000, () => {
  console.log('Server is running!');
});
