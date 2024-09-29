const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {
    const { googleId, email, name, imageUrl } = req.body;

    // Kiểm tra xem user đã tồn tại chưa
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Nếu user đã tồn tại, cập nhật thông tin
      user.googleId = googleId;
      user.profilePicture = imageUrl;
      await user.save();
    } else {
      // Nếu user chưa tồn tại, tạo mới
      user = new User({
        username: name,
        email,
        googleId,
        profilePicture: imageUrl,
      });
      await user.save();
    }

    // Tạo JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error in Google login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
