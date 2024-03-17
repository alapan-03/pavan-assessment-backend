var express = require('express');
var router = express.Router();

const authController = require("../controllers/authController");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/getUsers", authController.protect ,authController.getUsers);


module.exports = router;
