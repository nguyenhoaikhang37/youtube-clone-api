const User = require("../models/User");

exports.subscribeToChannel = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const channelToSubscribe = await User.findById(req.params.channelId);

    if (!channelToSubscribe) {
      return res.status(404).json({ error: "Channel not found" });
    }

    if (user.subscribedTo.includes(channelToSubscribe._id)) {
      return res
        .status(400)
        .json({ error: "Already subscribed to this channel" });
    }

    user.subscribedTo.push(channelToSubscribe._id);
    channelToSubscribe.subscribers.push(user._id);

    await user.save();
    await channelToSubscribe.save();

    res.json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error subscribing to channel" });
  }
};

exports.getSubscribedChannels = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "subscribedTo",
      "username"
    );
    res.json(user.subscribedTo);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subscribed channels" });
  }
};
