// middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter for both image and resume uploads
const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif/;
  const docTypes = /pdf|doc|docx/;
  const extname = path.extname(file.originalname).toLowerCase();

  // Allow image for profileImage, document for resume
  if (file.fieldname === "profileImage") {
    if (imageTypes.test(extname)) cb(null, true);
    else
      cb(
        new Error(
          "Only image files (jpeg, jpg, png, gif) allowed for profile image"
        ),
        false
      );
  } else if (file.fieldname === "resume") {
    if (docTypes.test(extname)) cb(null, true);
    else
      cb(
        new Error("Only document files (pdf, doc, docx) allowed for resume"),
        false
      );
  } else {
    cb(new Error("Invalid file field name"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter,
});

export default upload;
