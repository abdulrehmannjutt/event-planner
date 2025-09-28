import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log("mongo db connected!", connectionInstance.connection.host);
  } catch (err) {
    throw err;
  }
};

export default connectDB;