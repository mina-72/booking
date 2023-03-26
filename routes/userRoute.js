const userController = require("../controllers/userController");

const router = require("express").Router();

router.post("/adduser", userController.addUser);
router.get("/getuser", userController.getAllUsers);

module.exports = router;
