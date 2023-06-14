const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Friends = require("../models/friends");

exports.addFriend = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    Friends.findOne({ requester: req.body.recipient, recipient: userId })
      .then((friendrequest) => {
        Friends.findOne({
          requester: userId,
          recipient: req.body.recipient,
        })
          .then((friendrequest2) => {
            console.log(friendrequest, friendrequest2);
            if (friendrequest != null && friendrequest2 != null) {
              res.status(401).json({
                message:
                  "Vous avez déjà envoyé une demande d'ami à cet utilisateur ou vous êtes déjà amis !",
              });
            } else {
              const friends = new Friends({
                requester: userId,
                recipient: req.body.recipient,
                status: 1,
              });
              friends
                .save()
                .then(() =>
                  res.status(201).json({ message: "Demande d'ami envoyée !" })
                )
                .catch((error) =>
                  res
                    .status(500)
                    .json({
                      error,
                      message: "erreur serveur ou donnée invalide",
                    })
                );
            }
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.acceptFriend = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    Friends.findOne({ _id: req.body.requestid })
      .then((friend) => {
        if (friend.recipient == userId && friend.status == 1) {
          const friends = {
            status: 2,
          };
          Friends.updateOne({ _id: req.body.requestid }, friends)
            .then(() =>
              res.status(201).json({ message: "Demande d'ami acceptée !" })
            )
            .catch((error) =>
              res
                .status(500)
                .json({ error, message: "erreur serveur ou donnée invalide" })
            );
        } else {
          res.status(401).json({
            message:
              "Vous n'avez pas reçu de demande d'ami de cet utilisateur !",
          });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.getRequests = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  let friendsInfo = [];

  if (decodedToken) {
    Friends.find({ recipient: userId, status: 1 })
      .then(async (friends) => {
        for (let friend of friends) {
          let info = {};
          if (friend.recipient == userId) {
            await User.findOne({ _id: friend.requester })
              .select("-password -createdAt -updatedAt -__v")
              .then((user) => {
                info = {
                  requestId: friend._id,
                  requesterId: friend.requester,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                };
              })
              .catch((error) => res.status(500).json({ error }));
          }
          friendsInfo.push(info);
        }
        res.status(200).json(friendsInfo);
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.getFriends = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  let friendsInfo = [];

  if (decodedToken) {
    Friends.find({
      $or: [{ recipient: userId }, { requester: userId }],
      status: 2,
    })
      .then((friends) => {
        console.log(friends);
        for (let friend of friends) {
          if (friend.requester == userId) {
            friendsInfo.push(friend.recipient);
          } else if (friend.recipient == userId) {
            friendsInfo.push(friend.requester);
          }
        }

        console.log(friendsInfo);
        User.find({ _id: { $in: friendsInfo } })
          .select("-password -createdAt -updatedAt -__v")
          .then((friends) => {
            console.log(friends);
            res.status(200).json(friends);
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.getSendRequests = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  let friendsInfo = [];

  if (decodedToken) {
    Friends.find({ requester: userId, status: 1 })
      .then(async (friends) => {
        for (let friend of friends) {
          let info = {};
          if (friend.requester == userId) {
            await User.findOne({ _id: friend.recipient })
              .select("-password -createdAt -updatedAt -__v")
              .then((user) => {
                info = {
                  requestId: friend._id,
                  recipientId: friend.recipient,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                };
              })
              .catch((error) => res.status(500).json({ error }));
          }
          friendsInfo.push(info);
        }
        res.status(200).json(friendsInfo);
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
