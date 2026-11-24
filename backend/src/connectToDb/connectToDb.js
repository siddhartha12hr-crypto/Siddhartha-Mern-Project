import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/siddhartha-ebooks");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDb;
