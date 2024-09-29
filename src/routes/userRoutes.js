const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/subscribe/:channelId", auth, userController.subscribeToChannel);
router.get("/subscribed", auth, userController.getSubscribedChannels);

module.exports = router;
