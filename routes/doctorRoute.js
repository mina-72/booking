const doctorController = require("../controllers/doctorController");

const router = require("express").Router();

//create new doctor
router.post("/adddoctor", doctorController.createDoctor);

//get all doctors
const { getAllDoctors } = require("../controllers/doctorController");
router.get("/getalldoctors", doctorController.getAllDoctors);

module.exports = router;
