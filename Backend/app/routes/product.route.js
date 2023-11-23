const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ProductConTroller = require("../controllers/product.controller")

router.route("/add").post(ProductConTroller.addProduct);
router.route("/:id").get(ProductConTroller.findProductID);
router.route("/update/:id").put(ProductConTroller.updateProduct);
router.route("/delete/").delete(ProductConTroller.deleteProduct);
router.route("/").get( ProductConTroller.findAllProduct);


module.exports = router;