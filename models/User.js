const mongoose = require("mongoose");
const { Schema } = mongoose; // equivalent to this: const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema);
