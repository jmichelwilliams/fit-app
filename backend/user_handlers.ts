import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from './db_connect';

dotenv.config({ path: '../.env' });

const { MONGO_URI, DB_NAME, PROGRAMS_COLLECTION } = process.env;

export const getAllProgramsForUser = async (req: Request, res: Response) => {
  if (!MONGO_URI || !DB_NAME || !PROGRAMS_COLLECTION) {
    throw new Error('MONGO_URI or DB_NAME not defined');
  }
  const { client, db } = await connectToDatabase(MONGO_URI, DB_NAME);

  try {
    const collection = db.collection(PROGRAMS_COLLECTION);
    const result = await collection.find().toArray();

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
