const { success, error } = require("../utils/responseWrapper");
const ElectiveSubject = require("../models/electiveSubject");

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

    const updatedElectiveSub = await ElectiveSubject.findByIdAndUpdate(id, {
      name,
      description,
      code,
    });
    return res.send(success(200, updatedElectiveSub));
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
};
