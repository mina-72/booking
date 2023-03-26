const doctorController = require("../controllers/doctorController");

const router = require("express").Router();

router.post("/adddoctor", doctorController.createDoctor);
router.get("/getdoctor", doctorController.getDoctor);
module.exports = router;
