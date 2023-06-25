const router = require("express").Router();
const studentsController = require("../controllers/studentController");

router.get("/all", studentsController.getAllStudents);
router.post("/add", studentsController.addStudent);
router.put("/update/:id", studentsController.updateStudent);
router.delete("/delete/:id", studentsController.deleteStudent);

module.exports = router;
