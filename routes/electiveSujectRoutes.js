const router = require("express").Router();
const electiveSubController = require("../controllers/electiveSubController.js");

router.get("/all", electiveSubController.getAllElectiveSubs);
router.get("/:id", electiveSubController.getSingleElectiveSub);
router.post("/add", electiveSubController.addElectiveSub);
router.put("/update/:id", electiveSubController.updateElectiveSub);
router.delete("/delete/:id", electiveSubController.deleteElectiveSub);
router.delete(
  "/deleteStudent/:id",
  electiveSubController.deleteStudentFromElectiveSub
);

module.exports = router;
