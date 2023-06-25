const mongoose = require("mongoose");

const studentElectiveSubjectSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  electiveSubject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ElectiveSubject",
    required: true,
  },
});

module.exports = mongoose.model(
  "StudentElectiveSubject",
  studentElectiveSubjectSchema
);
