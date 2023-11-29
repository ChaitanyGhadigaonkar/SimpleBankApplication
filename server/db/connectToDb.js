import mongoose from "mongoose";
import { MONGODB_URI } from "../config/index.js";

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`connected to mongo db : ${connect.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectToDb;
