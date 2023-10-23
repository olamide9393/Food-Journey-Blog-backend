const mongooose = require("mongoose");
const { Schema } = mongooose;
const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongooose.model("auth", UserSchema);
