const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  electiveSubject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ElectiveSubject",
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
