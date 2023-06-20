const multer = require("multer");
const path = require("path");


const Storage = multer.diskStorage({
  // Destination to store image 
  destination: "uploads"
  ,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});


const Upload = multer({
  storage: Storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: {
    fileSize: 100000000, // 1000000 Bytes = 1 MB
  },
});


module.exports = Upload.single("file");