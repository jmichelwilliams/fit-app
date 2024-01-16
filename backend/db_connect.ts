import { MongoClient } from 'mongodb';

export const connectToDatabase = async (MONGO_URI: string, DB_NAME: string) => {
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
