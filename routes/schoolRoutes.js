const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");
const { validateSchoolData } = require("../middleware/validateSchoolData");

router.post("/addSchool", validateSchoolData, schoolController.addSchool);
router.get("/listSchools", schoolController.listSchools);

module.exports = router;