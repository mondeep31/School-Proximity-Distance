const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");
const { validateSchool, validateCoordinates } = require("../middleware/validateSchoolData");


router.post("/addSchool", validateSchool, schoolController.addSchool);
router.get("/listSchools", validateCoordinates, schoolController.listSchools);

module.exports = router;