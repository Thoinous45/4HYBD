const jwt = require("jsonwebtoken");
const ChatRoom = require("../models/Chatroom");
const Friends = require("../models/Friends");
const User = require("../models/User");

exports.initiate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    Friends.find({
      $or: [
        { recipient: userId, requester: req.body.userIds },
        { requester: userId, recipient: req.body.userIds },
      ],
      status: 2,
    })
      .then(async (friends) => {
        const newChatRoom = new ChatRoom({
          conversationName: req.body.conversationName,
          initiator: userId,
          userIds: [userId, req.body.userIds],
          readby: [userId],

          messages: {
            sender: userId,
            message: "Bienvenue dans cette conversation",
          },
        });

        newChatRoom
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) =>
        res.status(500).json("vous n'êtes pas amis ou une erreur est survenue")
      );
  }
};

exports.myConversations = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.find({ userIds: userId })
      .select("-userIds -initiator -__v -createdAt -updatedAt")
      .then((chatrooms) => {
        res.status(200).json(chatrooms);
      })
      .catch((error) =>
        res
          .status(500)
          .json("une erreur est survenue ou la demande n'existe pas")
      );
  }
};

exports.postMessage = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.body.roomId })
      .then((chatroom) => {
        if (chatroom.userIds.includes(userId)) {
          const newMessage = {
            sender: userId,
            message: req.body.message,
          };
          chatroom.messages.push(newMessage);
          chatroom.readby = [userId];
          chatroom
            .save()
            .then(() => {
              res.status(200).json("message envoyé");
            })
            .catch((error) =>
              res
                .status(500)
                .json("une erreur est survenue ou la demande n'existe pas")
            );
        } else {
          res
            .status(500)
            .json(
              "vous n'êtes pas autorisé à envoyer un message dans cette conversation"
            );
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json("une erreur est survenue ou la demande n'existe pas")
      );
  }
};

exports.getMessages = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.params.id })
      .then((chatroom) => {
        if (chatroom.userIds.includes(userId)) {
          chatroom.readby.push(userId);
          chatroom
            .save()
            .then(() => {
              res.status(200).json(chatroom.messages);
            })
            .catch((error) =>
              res
                .status(500)
                .json("une erreur est survenue ou la demande n'existe pas")
            );
        } else {
          res
            .status(500)
            .json(
              "vous n'êtes pas autorisé à envoyer un message dans cette conversation"
            );
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json("une erreur est survenue ou la demande n'existe pas")
      );
  }
};

exports.addUserToConversation = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.params.id })
      .then((chatroom) => {
        if (
          chatroom.userIds.includes(userId) &&
          chatroom.userIds.includes(req.body.userId) === false
        ) {
          User.findOne({ _id: req.body.userId })
            .select("-password -__v -createdAt -updatedAt")
            .then((user) => {
              const newMessage = {
                sender: "Chatbot",
                message: "L'utilisateur " + user.username + " a été ajouté",
              };
              chatroom.messages.push(newMessage);
              chatroom.userIds.push(req.body.userId);
              chatroom
                .save()
                .then(() => {
                  res.status(200).json("utilisateur ajouté");
                })
                .catch((error) =>
                  res
                    .status(500)
                    .json("une erreur est survenue ou la demande n'existe pas")
                );
            });
        } else {
          res
            .status(500)
            .json(
              "vous n'avez pas le droit d'ajouter des personnes à cette conversation ou l'utilisateur est déjà présent"
            );
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json("une erreur est survenue ou la demande n'existe pas")
      );
  }
};

/*
export default {


  postMessage: async (req, res) => {},
  getRecentConversation: async (req, res) => {},
  getConversationByRoomId: async (req, res) => {},
  markConversationReadByRoomId: async (req, res) => {},
};*/
