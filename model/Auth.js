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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // isAdmin: {
  //   type: Boolean,
  //   required: false
  // },
});

module.exports = mongooose.model("UserAuth", UserSchema);
