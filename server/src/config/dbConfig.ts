import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
