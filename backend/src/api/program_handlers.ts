import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from '../database/db_connect';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '../.env' });

const { PROGRAMS_COLLECTION } = process.env;

interface Exercise {
  exerciseName: string;
  sets: number;
  reps: number;
  rest: string;
  weight?: number;
}

interface Program {
  _id: string;
  programName: string;
  exercises: Exercise[];
  createdBy: string;
}

export const getAllProgramsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!PROGRAMS_COLLECTION) {
    throw new Error('PROGRAMS_COLLECTION not defined');
  }
  const { client, db } = await connectToDatabase();

  try {
    const programCollection = db.collection(PROGRAMS_COLLECTION);

    const result = await programCollection
      .find({ createdBy: userId as any })
      .toArray();

    if (result.length === 0) {
      res.status(404).json({ status: 404, message: 'No program found!' });
    } else {
      res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ status: 500, error: 'Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export const addProgram = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { programName, exercises } = req.body.newProgram;

  if (!PROGRAMS_COLLECTION) {
    throw new Error('PROGRAMS_COLLECTION not defined');
  }
  const { client, db } = await connectToDatabase();

  try {
    const programCollection = db.collection(PROGRAMS_COLLECTION);

    const newProgram: Program = {
      _id: uuidv4(),
      programName,
      exercises,
      createdBy: userId,
    };

    const result = await programCollection.insertOne(newProgram as any);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Server error, try again' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};
