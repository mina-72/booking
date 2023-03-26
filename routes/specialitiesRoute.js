const specialitiesController = require("../controllers/specialitiesController");

const router = require("express").Router();

router.post("/addspeciality", specialitiesController.addSpeciality);
// router.get("/getspeciality", specialitiesController.getOneSpecialitiesDoctor);
module.exports = router;
