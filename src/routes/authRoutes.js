const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google-login", googleAuthController.googleLogin);

module.exports = router;
