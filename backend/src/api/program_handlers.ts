import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from '../database/db_connect';

dotenv.config({ path: '../.env' });

const { PROGRAMS_COLLECTION } = process.env;

export const getAllProgramsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log('request:', req);
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

// export const addProgram = async (req: Request, res: Response) => {
//   const { userId, } = req.params;

//   if (!PROGRAMS_COLLECTION) {
//     throw new Error('PROGRAMS_COLLECTION not defined');
//   }
//   const { client, db } = await connectToDatabase();

//   try{

//   }

// };
