const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;
