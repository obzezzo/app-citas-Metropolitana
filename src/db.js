import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user_db_citas:cHKM5HSd60c3MaLq@cluster0.vmhccsu.mongodb.net/db_citas?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB is connected...>>")
  } catch (error) {
    console.log(error)
  }
};