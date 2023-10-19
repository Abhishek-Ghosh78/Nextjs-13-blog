import mongoose from "mongoose";
const url = process.env.MONGO_URI!;

const connectDB = () => {
  mongoose.connect(url);
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Database Connected Successfully.");
  });
};

export default connectDB;
