const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
  dest: '/public/images/upload',
  filename: (req, file, cb) => {
    cb(null, `${new Date()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('imgUrl'), (req, res, next) => {
  console.log(req.file)
});

module.exports = router;
