const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const joi = require("../middlewares/joi");
const regex = require("../middlewares/regex");
const auth=require("../middlewares/auth")

//user route

router.post("/signup",joi.userRegister,regex.authValidation, userCtrl.createUser);
//bouncer protect from brutforce
router.post("/login", userCtrl.login)
router.get ("/islogin",userCtrl.isLogin)
router.put("/modify",auth,userCtrl.modifyUser)
router.get("/all",userCtrl.getAllUser)
router.get("/one/:id",userCtrl.getOneUser)
router.get("/stranger",userCtrl.getStrangerOnly)
router.post("/postStory",userCtrl.postStory)
router.get ("/getStory",userCtrl.getStory)

module.exports = router;
