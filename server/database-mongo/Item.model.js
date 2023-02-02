const mongoose = require("mongoose");
const db = require("./index.js");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});
const User = mongoose.model("User", userSchema);
////////////
const toWatchSchema = new Schema({
  item: Object,
  type: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});
const ToWatch = mongoose.model("ToWatch", toWatchSchema);
///////////////////
const watchedSchema = new Schema({
  item: Object,
  type: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});


const Watched = mongoose.model("Watched", watchedSchema);

module.exports = {
  User,
  ToWatch,
  Watched
};
