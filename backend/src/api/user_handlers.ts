import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from '../database/db_connect';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '../.env' });

const { USERS_COLLECTION } = process.env;

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!USERS_COLLECTION) {
    throw new Error('MONGO_URI or DB_NAME not defined');
  }
  const { client, db } = await connectToDatabase();

  try {
    const userCollection = db.collection(USERS_COLLECTION);
    const result = await userCollection.findOne({ _id: userId as any });

    if (result === null) {
      res.status(404).json({ status: 404, message: 'No User found' });
    } else {
      res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};
