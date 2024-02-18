const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  //user login page
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("login", userSchema);
module.exports = UserModel;
