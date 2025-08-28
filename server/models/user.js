import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  friends: {
    type: Array,
    default:[]
  },
  requestsReceived: {
    type: Array,
    default: [],
  },
  requestSent: {
    type: Array,
    default: [],
  },
});

const User = model("User", userSchema);
export default User;
