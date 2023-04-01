const doctorController = require("../controllers/doctorController");

const router = require("express").Router();

//create new doctor
router.post("/adddoctor", doctorController.createDoctor);

//get all doctors
const { getAllDoctors } = require("../controllers/doctorController");
router.get("/getalldoctors", async (req, res, next) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json({ doctors: doctors });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
