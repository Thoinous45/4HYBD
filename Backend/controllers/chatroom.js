const jwt = require("jsonwebtoken");
const ChatRoom = require("../models/Chatroom");
const Friends = require("../models/Friends");
const User = require("../models/User");

exports.initiate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  const userFirstname = decodedToken.firstname;
  const userLastname = decodedToken.lastname;

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
            firstname: userFirstname ,
            lastname: userLastname,
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

        //res le tableau de chatrooms avec seulement le dernier messages de chaque conversation
        chatrooms.forEach((chatroom) => {
          chatroom.messages = chatroom.messages[chatroom.messages.length - 1];
        });

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
  const firstname = decodedToken.firstname;
  const lastname = decodedToken.lastname;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.body.roomId })
      .then((chatroom) => {
        if (chatroom.userIds.includes(userId)) {
          const newMessage = {
            sender: userId,
            firstname: firstname,
            lastname: lastname,
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
          if (chatroom.readby.includes(userId) === false)
          {
            chatroom.readby.push(userId);
          }
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
    ChatRoom.findOne({ _id: req.body.roomId })
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
                firstname: "Chat",
                lastname: "Bot",
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

exports.removeUserFromConversation = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.body.roomId })
      .then((chatroom) => {
        if (
          chatroom.userIds.includes(userId) &&
          chatroom.userIds.includes(req.body.userId) === true &&
          chatroom.userIds.length > 2
        ) {
          User.findOne({ _id: req.body.userId })
            .select("-password -__v -createdAt -updatedAt")
            .then((user) => {
              const newMessage = {
                sender: "Chatbot",
                firstname: "Chat",
                lastname: "Bot",
                message: "L'utilisateur " + user.username + " a été supprimé",
              };
              chatroom.messages.push(newMessage);
              chatroom.userIds.splice(
                chatroom.userIds.indexOf(req.body.userId),
                1
              );
              chatroom
                .save()
                .then(() => {
                  res.status(200).json("utilisateur supprimé");
                })
                .catch((error) =>
                  res
                    .status(500)
                    .json("une erreur est survenue ou la demande n'existe pas")
                );
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
              "vous n'avez pas le droit de supprimer des personnes à cette conversation ou l'utilisateur n'est pas présent"
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

exports.deleteConversation = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.body.roomId })
      .then((chatroom) => {
        if (
          chatroom.userIds.includes(userId) &&
          chatroom.initiator === userId
        ) {
          ChatRoom.deleteOne({ _id: req.body.roomId })
            .then(() => {
              res.status(200).json("conversation supprimée");
            })
            .catch((error) =>
              res
                .status(500)
                .json("une erreur est survenue ou la demande n'existe pas")
            );
        } else {
          res
            .status(500)
            .json("vous n'avez pas le droit de supprimer cette conversation");
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json("une erreur est survenue ou la demande n'existe pas")
      );
  }
};

exports.changeConversationName = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    ChatRoom.findOne({ _id: req.params.id })
      .then((chatroom) => {
        if (
          chatroom.userIds.includes(userId) 
        ) {
          chatroom.conversationName = req.body.name;
          chatroom
            .save()
            .then(() => {
              res.status(200).json("nom de la conversation modifié");
            })
            .catch((error) =>
              res
                .status(500)
                .json("une erreur est survenue ou la demande n'existe pas")
            );
        } else {
          res
            .status(500)
            .json("vous n'avez pas le droit de modifier cette conversation");
        } 
      })
      .catch((error) =>
        res
          .status(500)
          .json("une erreur est survenue ou la demande n'existe pas")
      );
  }
};
