// Middleware/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;