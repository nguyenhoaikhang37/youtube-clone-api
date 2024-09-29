const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // Thư mục lưu trữ file upload
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất bằng cách thêm timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Hàm kiểm tra loại file
const fileFilter = (req, file, cb) => {
  // Chấp nhận video files
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Cấu hình multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Giới hạn kích thước file (ví dụ: 100MB)
  },
});

module.exports = upload;
