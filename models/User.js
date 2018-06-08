const mongoose = require("mongoose");
const { Schema } = mongoose;
//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  avatar: {
    type: String,
    required: true
  }
});
module.exports = User = mongoose.model("users", UserSchema);
