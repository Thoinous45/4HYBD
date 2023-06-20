const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Friends = require("../models/Friends");

exports.addFriend = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken || userId !== req.body.recipient) {
    await Friends.findOne({ $or: [{ requester: userId , recipient : req.body.userIds}, { requester: req.body.userIds , recipient:userId}] })
      .then((friend) => {
        if (friend == null) {
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
                    .json({ error, message: "erreur serveur ou donnée invalide" })
                );
        } else {
          res.status(401).json({
            message:
              "Vous êtes déjà amis ou vous avez déjà envoyé une demande d'ami à cet utilisateur!",
          });
        }
      })
      .catch((error) => res.status(500).json("une erreur est survenue ou la demande n'existe pas"));
  }else {
    res.status(401).json({
      message:
        "Vous ne pouvez pas vous ajouter en ami ou une erreur de token est survenue!",
    });
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
              "Vous n'avez pas reçu de demande d'ami de cet utilisateur ou vous êtes déjà amis!",
          });
        }
      })
      .catch((error) => res.status(500).json("une erreur est survenue ou la demande n'existe pas"));
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
        for (let friend of friends) {
          if (friend.requester == userId) {
            friendsInfo.push(friend.recipient);
          } else if (friend.recipient == userId) {
            friendsInfo.push(friend.requester);
          }
        }
        User.find({ _id: { $in: friendsInfo } })
          .select("-password -createdAt -updatedAt -__v")
          .then((friends) => {
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


exports.deleteFriend = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    Friends.findOne({ $or: [{ requester: userId , recipient : req.body.userIds}, { requester: req.body.userIds , recipient:userId}] })
      .then((friend) => {
        if (friend) {
          Friends.deleteOne({ _id: friend._id })
            .then(() => res.status(200).json({ message: "Ami supprimé !" }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          res.status(401).json({
            message:
              "Vous n'êtes pas amis avec cet utilisateur ou une erreur de token est survenue!",
          });
        }
      }
      )
      .catch((error) => res.status(500).json({ error }));
  }
};