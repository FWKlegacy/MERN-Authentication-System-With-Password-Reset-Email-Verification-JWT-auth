import mongoose from "mongoose";

const conectDB = async () => {
  mongoose.connection.on("connected", () => console.log("database connected"));
  await mongoose.connect(`${process.env.MONGODB_URL}/Mern-Auth`);
};

export default conectDB;
