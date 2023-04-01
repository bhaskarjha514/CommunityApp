const express = require('express')
const router  = express.Router();
const multer  = require('multer');

const authMiddleware = require("../middleware/auth");

const {
    signIn,
    updateProfile,
    getMyProfile,
    uploadProfilePicture
} = require("../controllers/user");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profilePicture/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})
  
const upload = multer({ storage: storage })
  
  

router.post("/signin/", signIn);
router.post("/profile/", authMiddleware,getMyProfile);
router.patch("/update_profile/", authMiddleware,updateProfile);
router.post("/upload_profile_picture", upload.single('image'),uploadProfilePicture);





module.exports = router;

