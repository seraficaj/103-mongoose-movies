const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const userSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
