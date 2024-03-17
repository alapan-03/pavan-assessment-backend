const authController = require("../controllers/authController");
const itemController = require("../controllers/itemsController");
const bodyParser = require("body-parser");
const express= require("express");
const router = express.Router();


router.route("/getItem").get(bodyParser.json(), itemController.getItemByUser);
router.route("/createItem").post(bodyParser.json(), authController.protect, itemController.addItem);
router.route("/:id/deleteItem").delete(bodyParser.json(), authController.protect, itemController.deleteItems);

module.exports = router;