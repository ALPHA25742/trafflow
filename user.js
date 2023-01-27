'use strict';

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    mobile:{
      type: Number,
      required: true,
    },
    location:{
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber:{
      type: String,
      required: true,
      unique: true,
    },
    vehicleNumber:{
      type: String,
      required: true,
      unique: true,
    }

  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
