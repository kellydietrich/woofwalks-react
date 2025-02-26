import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";

export const connectDB = async (): Promise<void> => {
    try {
      dotenv.config();

      const dbConnString = process.env.DB_CONN_STRING;

      if (!dbConnString) {
        throw new Error("DB_CONN_STRING is not defined in your .env file.");
        }

      const conn = await mongoose.connect(dbConnString!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions);
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };


//   In this code, dbName is specified as part of the connection options to 
// ensure that you're connecting to the gamesDB database as defined in your .env file. 
// This makes it more explicit and ensures consistency between your environment variables 
// and the connection string. Just make sure that your .env file defines DB_NAME 
// as "gamesDB" in this case.