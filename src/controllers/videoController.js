const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const newVideo = new Video({
      title,
      description,
      fileUrl: req.file.path,
      owner: req.user._id,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("owner", "username");
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "owner",
      "username"
    );
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Error fetching video" });
  }
};
