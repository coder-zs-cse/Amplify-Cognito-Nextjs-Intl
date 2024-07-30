import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  provider: {
    type: String,
    default: "credentials",
  },
});

const User = mongoose.model("User", userSchema, "users", {
  overwriteModels: true,
});

export default User;
