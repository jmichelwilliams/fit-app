import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from '../database/db_connect';
import { ObjectId } from 'mongodb';

dotenv.config({ path: '../.env' });

const { WORKOUTS_COLLECTION } = process.env;

if (!WORKOUTS_COLLECTION) {
  throw new Error('WORKOUTS_COLLECTION not defined');
}

export const getAllWorkoutsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { client, db } = await connectToDatabase();
  const parsedUserId = userId.split('|')[1];

  const workoutsCollection = db.collection(WORKOUTS_COLLECTION);

  const result = await workoutsCollection
    .find({ createdBy: new ObjectId(parsedUserId) })
    .toArray();

  if (result.length === 0) {
    res.status(404).json({ status: 404, message: 'No workouts found!' });
  } else {
    res.status(200).json({ status: 200, data: result });
  }

  if (client) {
    await client.close();
  }
};

export const addWorkout = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { workoutSession, timezone } = req.body;
  const { client, db } = await connectToDatabase();
  const parsedUserId = userId.split('|')[1];
  const workoutCollection = db.collection(WORKOUTS_COLLECTION);
  const today = new Date().toLocaleString('en-US', { timeZone: timezone });

  const formattedExercises = workoutSession.exercises.map((exercise: any) => {
    const setsArray = Array.from(
      { length: exercise.sets.length },
      (_, index) => ({
        ...exercise.sets[index],
        setId: index + 1,
      }),
    );

    return {
      weight: exercise.weight,
      sets: setsArray,
      completed: exercise.completed,
      exerciseName: exercise.exerciseName,
      rest: exercise.rest,
    };
  });

  const newWorkoutSession = {
    _id: new ObjectId(),
    exercises: formattedExercises,
    createdBy: new ObjectId(parsedUserId),
    programName: workoutSession.programName,
    createdOn: today,
  };

  const result = await workoutCollection.insertOne(newWorkoutSession as any);
  res.status(200).json({ status: 200, data: result });

  if (client) {
    await client.close();
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  const { client, db } = await connectToDatabase();

  const workoutCollection = db.collection(WORKOUTS_COLLECTION);

  const result = await workoutCollection.deleteOne({
    _id: new ObjectId(workoutId),
  });

  if (result.deletedCount > 0) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(404).json({ status: 404, message: 'No workouts found!' });
  }

  if (client) {
    await client.close();
  }
};
