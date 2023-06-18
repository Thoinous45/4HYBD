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

const friendCtrl = require("../controllers/friends");

router.post("/add",friendCtrl.addFriend);
router.put("/accept",friendCtrl.acceptFriend);
router.get ("/",friendCtrl.getFriends);
router.get ("/request",friendCtrl.getRequests);
router.get ("/requestsend",friendCtrl.getSendRequests);

module.exports = router;


