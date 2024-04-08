import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { MONGO_URI, DB_NAME } = process.env;

export const connectToDatabase = async () => {
  try {
    if (!MONGO_URI || !DB_NAME) {
      throw new Error('Environment variables not set');
    }
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    return { client, db };
  } catch (error) {
    throw error;
  }
};
