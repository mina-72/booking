const appointmentController = require("../controllers/appointmentController");

const router = require("express").Router();

router.post("/addAppointment", appointmentController.createAppointment);

module.exports = router;
