const patientController = require("../controllers/patientController");

const router = require("express").Router();

router.post("/addpatient", patientController.createPatient);

module.exports = router;
