const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const cartcontroller = require("../controllers/cart.controller")

router.route("/add").post(cartcontroller.createCart)
router.route("/getallcarts").get(cartcontroller.getAllCart);
router.route("/increase").get(cartcontroller.increase);
router.route("/decrease").get(cartcontroller.decrease);
router.route("/delete").delete(cartcontroller.deleteCartItem);
module.exports = router;