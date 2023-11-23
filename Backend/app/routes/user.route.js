const express = require("express");
const users = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(users.register);
router.route("/loginad").post(users.loginAd);
router.route("/login").post(users.login);
router.route("/listusers").get(users.listUsers);
router.route("/getinfor").get(auth);

module.exports = router;
