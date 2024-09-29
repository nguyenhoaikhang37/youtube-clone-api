const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.get("/:videoId", commentController.getComments);
router.post("/:videoId", auth, commentController.addComment);
router.post("/:commentId/reactions", auth, commentController.addReaction);
router.delete("/:commentId/reactions", auth, commentController.removeReaction);

module.exports = router;
