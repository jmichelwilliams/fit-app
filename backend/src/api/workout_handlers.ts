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

  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  try {
    const skip = (page - 1) * limit;
    const result = await db
      .collection(WORKOUTS_COLLECTION)
      .find({ createdBy: new ObjectId(parsedUserId) })
      .skip(skip)
      .limit(limit)
      .sort({ createdOn: -1 })
      .toArray();

    const totalCount = await db
      .collection(WORKOUTS_COLLECTION)
      .countDocuments({ createdBy: new ObjectId(parsedUserId) });

    const hasMore = page * limit < totalCount;

    res.status(200).json({
      status: 200,
      data: result,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export const addWorkout = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { workoutSession } = req.body;
  const { client, db } = await connectToDatabase();
  const parsedUserId = userId.split('|')[1];
  const workoutCollection = db.collection(WORKOUTS_COLLECTION);

  const createdOn = new Date();

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
    createdOn,
  };

  const result = await workoutCollection.insertOne(newWorkoutSession as any);
  res.status(200).json({ status: 200, data: result });

  if (client) {
    await client.close();
  }
};

export const getLatestWorkoutForUser = async (req: Request, res: Response) => {
  const { userId, programName } = req.params;
  const { client, db } = await connectToDatabase();
  const parsedUserId = userId.split('|')[1];

  const workoutsCollection = db.collection(WORKOUTS_COLLECTION);

  try {
    const latestWorkout = await workoutsCollection.findOne(
      { createdBy: new ObjectId(parsedUserId), programName: programName },
      { sort: { createdOn: -1 } },
    );

    if (!latestWorkout) {
      return res
        .status(404)
        .json({ message: 'No workouts found for this program.' });
    }

    return res.status(200).json({ status: 200, data: latestWorkout });
  } catch (error) {
    console.error('Error fetching the latest workout:', error);
    return res
      .status(500)
      .json({ message: 'Server error, please try again later.' });
  } finally {
    if (client) {
      await client.close();
    }
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
