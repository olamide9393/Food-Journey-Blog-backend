const mongooose = require("mongoose");
const { Schema } = mongooose;
const UserSchema = new Schema({
  photo: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
},{timestamps:true});

module.exports = mongooose.model("foodblog", UserSchema);
