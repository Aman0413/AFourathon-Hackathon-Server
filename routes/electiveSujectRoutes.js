const router = require("express").Router();
const electiveSubController = require("../controllers/electiveSubController.js");

router.get("/all", electiveSubController.getAllElectiveSubs);
router.post("/add", electiveSubController.addElectiveSub);
router.put("/update/:id", electiveSubController.updateElectiveSub);
router.delete("/delete/:id", electiveSubController.deleteElectiveSub);

module.exports = router;
