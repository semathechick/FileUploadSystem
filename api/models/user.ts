import { Schema, model } from "mongoose";
import type { UserType } from "../src/types";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
})

const UserModel = model<UserType>('User', UserSchema);

export default UserModel;