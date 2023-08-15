const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 2, max: 100 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, unique: true, min: 8 },
    isAdmin: { type: Boolean, default: false },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      zipCode: { type: String, default: null },
    },
    image: { type: String, default: "" },
    phone: { type: Number, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
