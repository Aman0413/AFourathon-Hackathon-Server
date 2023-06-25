const mongoose = require("mongoose");

const electiveSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("ElectiveSubject", electiveSubjectSchema);
