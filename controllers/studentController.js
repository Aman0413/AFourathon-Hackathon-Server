const { success, error } = require("../utils/responseWrapper");
const Student = require("../models/student");
const Subject = require("../models/electiveSubject");
const electiveSubject = require("../models/electiveSubject");

//generate a unique id for the student
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

//get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.send(success(200, students));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//add a new student
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

//update a student
const updateStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const id = req.params.id;

    //check if student exists
    const studentExist = await Student.findById(id);

    if (!studentExist) {
      return res.status(404).send("Student not found");
    }

    //if all fields have values
    if (name && email && phoneNumber) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phoneNumber,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
    if (name && email) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          name,
          email,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
    if (name && phoneNumber) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          name,
          phoneNumber,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
    if (email && phoneNumber) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          email,
          phoneNumber,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
    if (name) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          name,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
    if (email) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          email,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
    if (phoneNumber) {
      const student = await Student.findByIdAndUpdate(
        id,
        {
          phoneNumber,
        },
        {
          new: true,
        }
      );
      return res.status(200).send("Student updated");
    }
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//delete a student
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

//add elective subject
const addElectiveSub = async (req, res) => {
  try {
    const { firstSubjectId, secondSubjectId } = req.body;
    const stuId = req.params.id;

    const student = await Student.findById(stuId);
    if (!student) {
      return res.send(error(404, "Student not found"));
    }

    if (student.electiveSubject.length >= 2) {
      return res.status(400).send("Cannot add more than 2 subjects");
    }

    if (firstSubjectId === secondSubjectId) {
      return res.send(error(400, "Cannot add same subject twice"));
    }
    if (student.electiveSubject.includes(firstSubjectId || secondSubjectId)) {
      return res.status(400).json("Cannot add same subject twice");
    }

    if (!firstSubjectId && !secondSubjectId) {
      return res.send(error(400, "Please add atleast one subject"));
    }
    if (firstSubjectId) {
      student.electiveSubject.push(firstSubjectId);
      await electiveSubject.findByIdAndUpdate(firstSubjectId, {
        $push: { students: stuId },
      });
    }
    if (secondSubjectId) {
      student.electiveSubject.push(secondSubjectId);
      await electiveSubject.findByIdAndUpdate(secondSubjectId, {
        $push: { students: stuId },
      });
    }
    await student.save({ validateBeforeSave: false });

    return res.send(success(200, "Elective subject added"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//get a single student
const getsingleStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.send(error(404, "Student not found"));
    }
    if (student.electiveSubject.length > 0) {
      const subjectsOfStudent = await student.populate("electiveSubject");
      return res.send(success(200, subjectsOfStudent));
    }
    return res.send(success(200, student));
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
  getsingleStudent,
};
