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
  limits: {
    fileSize: 100000000, // 1000000 Bytes = 1 MB
  },
});


module.exports = Upload.single("file");