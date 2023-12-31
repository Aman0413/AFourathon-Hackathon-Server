const { success, error } = require("../utils/responseWrapper");
const ElectiveSubject = require("../models/electiveSubject");
const Student = require("../models/student");
const mongoose = require("mongoose");

//get all elective subjects
const getAllElectiveSubs = async (req, res) => {
  try {
    const electiveSubs = await ElectiveSubject.find();
    return res.send(success(200, electiveSubs));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//add elective subject
const addElectiveSub = async (req, res) => {
  try {
    const { name, description, code } = req.body;
    //check if elective subject already exists
    const alreadyExist = await ElectiveSubject.findOne({ code });
    if (alreadyExist) {
      return res.send(error(400, "Elective subject already exists"));
    }
    const newElectiveSub = await ElectiveSubject.create({
      name,
      description,
      code,
    });

    return res.send(success(200, newElectiveSub));
  } catch (err) {}
};

//update elective subject
const updateElectiveSub = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, code } = req.body;

    //check if elective subject exists
    const electiveSub = await ElectiveSubject.findById(id);
    if (!electiveSub) {
      return res.status(404).send("Elective subject not found");
    }

    //if all fields have values
    if (name && description && code) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        name,
        description,
        code,
      });
      return res.status(200).send("Subject Updated");
    }
    //if some fields have values
    if (name && description) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        name,
        description,
      });
      return res.status(200).send("Subject Updated");
    }
    if (name && code) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        name,
        code,
      });
      return res.status(200).send("Subject Updated");
    }
    if (description && code) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        description,
        code,
      });
      return res.status(200).send("Subject Updated");
    }
    if (description && name) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        description,
        name,
      });
      return res.status(200).send("Subject Updated");
    }

    if (code) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        code,
      });
      return res.status(200).send("Subject Updated");
    }

    if (name) {
      const subject = ElectiveSubject.findByIdAndUpdate(id, {
        name,
      });
      return res.status(200).send("Subject Updated");
    }
    if (description) {
      const subject = await ElectiveSubject.findByIdAndUpdate(id, {
        description,
      });
      return res.status(200).send("Subject Updated");
    }
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//delete elective subject
const deleteElectiveSub = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedElectiveSub = await ElectiveSubject.findByIdAndDelete(id);
    return res.send(success(200, deletedElectiveSub));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//get single elective subject
const getSingleElectiveSub = async (req, res) => {
  try {
    const id = req.params.id;
    const subject = await ElectiveSubject.findById(id);
    if (!subject) return res.send(error(404, "Elective subject not found"));
    if (subject.students.length > 0) {
      const allStudents = await subject.populate("students");
      return res.send(success(200, allStudents));
    }
    return res.send(success(200, subject));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//delete student from elective subject
const deleteStudentFromElectiveSub = async (req, res) => {
  try {
    const subjectId = req.body.subjectId;
    const studentId = req.params.id;

    //find subject
    const subject = await ElectiveSubject.findById(subjectId);
    if (!subject) return res.send(error(404, "Elective subject not found"));

    //find student
    const student = await Student.findById(studentId);
    if (!student) return res.send(error(404, "Student not found"));

    //remove student from subject
    await subject.students.pull(studentId);
    await subject.save({ validateBeforeSave: false });

    //remove subject from student
    await student.electiveSubject.pull(subject._id);
    await student.save({ validateBeforeSave: false });

    return res.send(success(200, subject));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

module.exports = {
  addElectiveSub,
  getAllElectiveSubs,
  updateElectiveSub,
  deleteElectiveSub,
  getSingleElectiveSub,
  deleteStudentFromElectiveSub,
};
