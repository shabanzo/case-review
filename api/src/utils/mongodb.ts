import config from 'config';
import { connect } from 'mongoose';

const dbUri = config.get<string>('dbUri');

export const connectMongoDb = async () => {
  console.log(`Connecting to ${dbUri}`);
  try {
    await connect(dbUri);
    console.log(`Connected to ${dbUri}`);
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectMongoDb, 5000);
  }
};
