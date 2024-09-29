const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { content, parentCommentId } = req.body;
    const videoId = req.params.videoId;

    let rootCommentId = null;
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      rootCommentId = parentComment.rootComment || parentComment._id;
    }

    const comment = new Comment({
      content,
      author: req.user._id,
      video: videoId,
      parentComment: parentCommentId || null,
      rootComment: rootCommentId,
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate("author", "username")
      .populate("parentComment", "author")
      .populate("rootComment", "author");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const videoId = req.params.videoId;

    const rootComments = await Comment.find({
      video: videoId,
      parentComment: null,
    }).populate("author", "username");

    const commentsWithReplies = await Promise.all(
      rootComments.map(async (rootComment) => {
        const replies = await Comment.find({
          rootComment: rootComment._id,
          _id: { $ne: rootComment._id },
        })
          .populate("author", "username")
          .populate("parentComment", "author")
          .sort({ createdAt: 1 });

        return {
          ...rootComment.toObject(),
          replies: replies,
        };
      })
    );

    res.json(commentsWithReplies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

exports.addReaction = async (req, res) => {
  try {
    const { type } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const existingReaction = comment.reactions.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingReaction) {
      existingReaction.type = type;
    } else {
      comment.reactions.push({ type, user: req.user._id });
    }

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error adding reaction" });
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.reactions = comment.reactions.filter(
      (r) => r.user.toString() !== req.user._id.toString()
    );

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error removing reaction" });
  }
};
