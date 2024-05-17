import mongoose from 'mongoose';

import { loggerService } from '../services';

export const dbConnect = (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return loggerService.info(`Successfully connected to ${db}`);
      })
      .catch((error: any) => {
        loggerService.error(`Error connecting to database: ${error}`);

        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
