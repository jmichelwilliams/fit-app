import express, { type Request, type Response } from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'This is not what you are looking for!',
  });
});
app.listen(8000, () => {
  console.log('Server is running!');
});
