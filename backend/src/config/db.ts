import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

interface ConnectOptions extends mongoose.ConnectOptions {
   useNewUrlParser: true;
   useUnifiedTopology: true;
   useFindAndModify: false;
}

const MONGO_URL = process.env.MONGO_URL;

export default {
   connect: () => {
      mongoose.connect(MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         // useFindAndModify: false,
      } as ConnectOptions);
      mongoose.connection.on("connected", () => {
         console.log("Connect to MongoDB successfully !!!");
      });
      mongoose.connection.on("error", (err) => {
         console.log(`Mongoose default connection has occured error: ${err} `);
      });
   },
};
