const authController = require("../controllers/authController");
// const userController = require("../Controllers/userController");
const bodyParser = require("body-parser");
const express= require("express");
const router = express.Router();


router.route("/signup").post(bodyParser.json(), authController.signup);
router.route("/login").post(bodyParser.json(), authController.login);
router.route("/getUsers").get(bodyParser.json(), authController.protect ,authController.getUsers);

module.exports = router;