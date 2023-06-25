const { success, error } = require("../utils/responseWrapper");
const Student = require("../models/student");

function generateUniqueId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  // Generate a random alphanumeric ID
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.send(success(200, students));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const addStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    //generate a unique id for the student
    const studentId = generateUniqueId();

    //check if student already exists
    const studentExist = await Student.findOne({ email, studentId });
    if (studentExist) {
      return res.send(error(400, "Student already exists"));
    }

    //create a new student
    const student = await Student.create({
      name,
      email,
      phoneNumber,
      studentId,
    });
    return res.send(success(200, student));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const updateStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const id = req.params.id;

    //check if student exists
    const student = await Student.findByIdAndUpdate(id, {
      name,
      email,
      phoneNumber,
    });

    //if student does not exist
    if (!student) {
      return res.send(error(404, "Student not found"));
    }
    return res.send(success(200, student));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndDelete(id);

    //if student does not exist
    if (!student) {
      return res.send(error(404, "Student not found"));
    }
    return res.send(success(200, student));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const addElectiveSub = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phoneNumber } = req.body;
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

module.exports = {
  addStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
  addElectiveSub,
};
