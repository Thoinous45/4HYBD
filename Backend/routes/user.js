const express = require("express");
const router = express.Router();
const bouncer = require("express-bouncer")(120000, 1.8e6, 5);

bouncer.blocked = function (req, res, next, remaining) {
  res.send(
    429,
    "Too many requests have been made, " +
      "please wait " +
      remaining / 1000 +
      " seconds"
  );
};

const userCtrl = require("../controllers/user");
const joi = require("../middlewares/joi");
const regex = require("../middlewares/regex");
const auth=require("../middlewares/auth")

//user route

router.post("/signup",joi.userRegister,regex.authValidation, userCtrl.createUser);
//bouncer protect from brutforce
router.post("/login",bouncer.block,joi.userLogin, userCtrl.login);
router.put("/modify",auth,userCtrl.modifyUser)
router.get("/all",userCtrl.getAllUser)
router.get("/one/:id",userCtrl.getOneUser)
router.get("/stranger",userCtrl.getStrangerOnly)
router.post("/postStory",userCtrl.postStory)
router.get ("/getStory",userCtrl.getStory)


module.exports = router;
