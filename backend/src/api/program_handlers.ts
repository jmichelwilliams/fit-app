import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from '../database/db_connect';
import { ObjectId } from 'mongodb';

dotenv.config({ path: '../.env' });

const { PROGRAMS_COLLECTION } = process.env;

if (!PROGRAMS_COLLECTION) {
  throw new Error('PROGRAMS_COLLECTION not defined');
}

interface Set {
  setId: number;
  reps: number;
}

interface Exercise {
  exerciseId: ObjectId;
  exerciseName: string;
  sets: Set[];
  rest: string;
  weight?: number;
}

interface ExerciseInput {
  exerciseName: string;
  sets: number;
  reps: number;
  rest: string;
  weight?: number;
}
interface ProgramInput {
  programName: string;
  exercises: ExerciseInput[];
}

interface Program {
  _id: ObjectId;
  programName: string;
  exercises: Exercise[];
  createdBy: ObjectId;
}

export const getAllProgramsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { client, db } = await connectToDatabase();
  const parsedUserId = userId.split('|')[1];

  const programCollection = db.collection(PROGRAMS_COLLECTION);

  const result = await programCollection
    .find({ createdBy: new ObjectId(parsedUserId) })
    .toArray();

  if (result.length === 0) {
    res.status(404).json({ status: 404, message: 'No program found!' });
  } else {
    res.status(200).json({ status: 200, data: result });
  }

  if (client) {
    await client.close();
  }
};

export const addProgram = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { program }: { program: ProgramInput } = req.body;
  const { client, db } = await connectToDatabase();
  const parsedUserId = userId.split('|')[1];

  const programCollection = db.collection(PROGRAMS_COLLECTION);

  const newExercises = program.exercises.map((exercise: ExerciseInput) => {
    const reps = exercise.reps;

    const setsArray: Set[] = Array.from(
      { length: exercise.sets },
      (_, index) => ({
        setId: index + 1,
        reps,
      }),
    );
    return {
      exerciseName: exercise.exerciseName,
      rest: exercise.rest,
      weight: exercise.weight,
      sets: setsArray,
      exerciseId: new ObjectId(),
    };
  });

  const newProgram: Program = {
    _id: new ObjectId(),
    programName: program.programName,
    exercises: newExercises,
    createdBy: new ObjectId(parsedUserId),
  };

  const result = await programCollection.insertOne(newProgram as any);
  res.status(200).json({ status: 200, data: result });

  if (client) {
    await client.close();
  }
};

export const getProgram = async (req: Request, res: Response) => {
  const { programId } = req.params;
  const { client, db } = await connectToDatabase();

  const programCollection = db.collection(PROGRAMS_COLLECTION);

  const result = await programCollection.findOne({
    _id: new ObjectId(programId),
  });

  if (result === null) {
    res.status(404).json({ status: 404, message: 'Program not found!' });
  } else {
    res.status(200).json({ status: 200, data: result });
  }

  if (client) {
    client.close();
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  const { programId } = req.params;
  const { updatedProgram } = req.body;
  const { client, db } = await connectToDatabase();

  try {
    const programCollection = db.collection(PROGRAMS_COLLECTION);
    const query = { _id: new ObjectId(programId) };
    const newValue = {
      $set: {
        programName: updatedProgram.programName,
        exercises: updatedProgram.exercises,
      },
    };

    // Find the program by its programId
    const program = await programCollection.findOne(query);

    if (!program) {
      return res
        .status(404)
        .json({ status: 404, message: 'Program not found' });
    }

    const hasChanges =
      program.programName !== updatedProgram.programName ||
      JSON.stringify(program.exercises) !==
        JSON.stringify(updatedProgram.exercises);

    if (!hasChanges) {
      return res
        .status(200)
        .json({ status: 200, message: 'No changes detected' });
    }
    // Update each exercise in the program
    const result = await programCollection.updateOne(query as any, newValue);

    if (result.modifiedCount > 0 && result.acknowledged == true) {
      res.status(200).json({ status: 200, result });
    } else {
      res.status(400).json({ status: 400, message: 'Workout not updated' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  } finally {
    if (client) {
      client.close();
    }
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  const { programId } = req.params;
  const { client, db } = await connectToDatabase();

  const programCollection = db.collection(PROGRAMS_COLLECTION);

  const result = await programCollection.deleteOne({
    _id: new ObjectId(programId),
  });

  if (!result) {
    res.status(404).json({ status: 404, message: 'Program not found' });
  } else {
    res.status(200).json({ status: 200, data: result });
  }

  if (client) {
    client.close();
  }
};
