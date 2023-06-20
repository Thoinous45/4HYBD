const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const joi = require("../middlewares/joi");
const regex = require("../middlewares/regex");
const auth=require("../middlewares/auth")
const multer=require("../middlewares/multer")

//user route

router.post("/signup",joi.userRegister,regex.authValidation, userCtrl.createUser);
router.post("/login",joi.userLogin, userCtrl.login)
router.get ("/islogin",userCtrl.isLogin)
router.put("/modify",auth,userCtrl.modifyUser)
router.get("/all",userCtrl.getAllUser)
router.get("/one/:id",userCtrl.getOneUser)
router.get("/stranger",auth,userCtrl.getStrangerOnly)
router.delete("/delete",auth,userCtrl.deleteUser)

//Story route
router.post("/postStory",auth,multer,userCtrl.postStory)
router.get ("/getStoryInfo",auth,userCtrl.getStory)
router.get ("/myStoryImage",auth,userCtrl.myStoryImage)
router.get ("/myStoryInfo",auth,userCtrl.myStoryInfo)

module.exports = router;
