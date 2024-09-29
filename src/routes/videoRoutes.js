const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post("/", auth, upload.single("video"), videoController.uploadVideo);
router.get("/", videoController.getVideos);
router.get("/:id", videoController.getVideoById);

module.exports = router;
