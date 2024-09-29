# Tài liệu API

## Tổng quan

API này được thiết kế để quản lý bình luận, video và tương tác của người dùng cho một nền tảng chia sẻ video. Nó cung cấp các endpoint để tạo, đọc, cập nhật và xóa bình luận, cũng như quản lý metadata của video và đăng ký của người dùng.

## Các Endpoint

### Endpoint Bình luận

#### GET /api/comments/:videoId

Lấy danh sách bình luận cho một video cụ thể.

- Tham số:
  - `videoId` (chuỗi): ID của video cần lấy bình luận.
- Phản hồi:
  - Một mảng JSON chứa các đối tượng bình luận, mỗi đối tượng bao gồm `id`, `content`, `author`, `parentComment`, và `replies`.

#### POST /api/comments/:videoId

Tạo một bình luận mới cho một video cụ thể.

- Tham số:
  - `videoId` (chuỗi): ID của video cần tạo bình luận.
  - `content` (chuỗi): Nội dung văn bản của bình luận.
  - `parentCommentId` (chuỗi, tùy chọn): ID của bình luận cha, nếu đây là một phản hồi.
- Phản hồi:
  - Một đối tượng JSON đại diện cho bình luận mới được tạo, chứa `id`, `content`, `author`, `parentComment`, và `replies`.

#### POST /api/comments/:commentId/reactions

Thêm một phản ứng vào bình luận.

- Tham số:
  - `commentId` (chuỗi): ID của bình luận cần thêm phản ứng.
  - `type` (chuỗi): Loại phản ứng bao gồm ("like", "haha", "sad", "angry", "love")
- Phản hồi:
  - Một đối tượng JSON đại diện cho bình luận đã cập nhật, chứa `id`, `content`, `author`, `parentComment`, `replies`, và `reactions`.

#### DELETE /api/comments/:commentId/reactions

Xóa một phản ứng khỏi bình luận.

- Tham số:
  - `commentId` (chuỗi): ID của bình luận cần xóa phản ứng.
- Phản hồi:
  - Một đối tượng JSON đại diện cho bình luận đã cập nhật, chứa `id`, `content`, `author`, `parentComment`, `replies`, và `reactions`.

### Endpoint Video

#### GET /api/videos

Lấy danh sách tất cả các video.

- Phản hồi:
  - Một mảng JSON chứa các đối tượng video, mỗi đối tượng bao gồm `id`, `title`, `description`, `fileUrl`, `thumbnailUrl`, và `owner`.

#### GET /api/videos/:id

Lấy một video cụ thể theo ID.

- Tham số:
  - `id` (chuỗi): ID của video cần lấy.
- Phản hồi:
  - Một đối tượng JSON đại diện cho video, chứa `id`, `title`, `description`, `fileUrl`, `thumbnailUrl`, và `owner`.

### Endpoint Người dùng

#### GET /api/users/subscribed

Lấy danh sách các kênh mà người dùng đã xác thực đã đăng ký.

- Phản hồi:
  - Một mảng JSON chứa các đối tượng người dùng, mỗi đối tượng bao gồm `id`, `username`, và `subscribedTo`.

#### POST /api/users/subscribe/:channelId

Đăng ký người dùng đã xác thực vào một kênh.

- Tham số:
  - `channelId` (chuỗi): ID của kênh cần đăng ký.
- Phản hồi:
  - Một đối tượng JSON đại diện cho người dùng đã cập nhật, chứa `id`, `username`, và `subscribedTo`.

## Các Mô hình

### Comment (Bình luận)

Đại diện cho một bình luận trên video.

- Thuộc tính:
  - `id` (chuỗi): ID duy nhất của bình luận.
  - `content` (chuỗi): Nội dung văn bản của bình luận.
  - `author` (đối tượng): Người dùng đã tạo bình luận.
  - `parentComment` (đối tượng, tùy chọn): Bình luận cha, nếu đây là một phản hồi.
  - `replies` (mảng): Một mảng các bình luận phản hồi.
  - `reactions` (mảng): Một mảng các phản ứng đối với bình luận.

### Video

Đại diện cho một video.

- Thuộc tính:
  - `id` (chuỗi): ID duy nhất của video.
  - `title` (chuỗi): Tiêu đề của video.
  - `description` (chuỗi): Mô tả của video.
  - `fileUrl` (chuỗi): URL của file video.
  - `thumbnailUrl` (chuỗi): URL của hình thu nhỏ video.
  - `owner` (đối tượng): Người dùng đã tải video lên.

### User (Người dùng)

Đại diện cho một người dùng.

- Thuộc tính:
  - `id` (chuỗi): ID duy nhất của người dùng.
  - `username` (chuỗi): Tên người dùng.
  - `subscribedTo` (mảng): Một mảng các kênh mà người dùng đã đăng ký.

## Xác thực

API này sử dụng JSON Web Tokens (JWT) để xác thực. Khi người dùng đăng nhập, một token JWT được tạo ra và trả về trong phản hồi. Token này phải được bao gồm trong header Authorization của tất cả các yêu cầu tiếp theo.

# youtube-clone-api
