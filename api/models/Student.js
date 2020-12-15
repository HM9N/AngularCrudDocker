const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define collection and schema for Business
let Student = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nit: {
      type: Number,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true,
    },
    career: {
      type: String,
      required: true,
    }
  },
  {
    collection: "students",
  }
);
module.exports = mongoose.model("Student", Student);
