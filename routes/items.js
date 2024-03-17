const authController = require("../controllers/authController");
const itemController = require("../controllers/itemsController");
const express= require("express");
const router = express.Router();


router.get("/getItem", authController.protect, itemController.getItemByUser);
router.post("/createItem", authController.protect, itemController.addItem);
router.delete("/:id/deleteItem", authController.protect, itemController.deleteItems);

module.exports = router;
