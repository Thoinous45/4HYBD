const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Friends = require("../models/Friends");
const fs = require("fs");

require("dotenv").config();

exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((err) => res.status(401).json({ err }));
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error, message: "erreur serveur ou donnée invalide" })
    );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          return res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
              },
              process.env.TOKEN_KEY,
              {
                expiresIn: "1d",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(400).json({
            error,
            message: "erreur serveur ou identifiant invalide",
            user,
          })
        );
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error, message: "erreur serveur ou identifiant invalide" })
    );
};

exports.isLogin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    User.find({ _id: userId })
      .then((user) => {
        if (user === null) {
          return res.status(401).json(false);
        } else {
          res.status(200).json(true);
        }
      })
      .catch((error) => res.status(401).json({ error }));
  } else {
    res.status(402).json(false);
  }
};

exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        if (req.body.password === req.body.password_confirmation) {
          const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
          };

          User.updateOne({ _id: userId }, user)
            .then(() =>
              res.status(201).json({ message: "Utilisateur modifié !" })
            )
            .catch((err) => res.status(401).json({ err }));
        } else {
          return res
            .status(401)
            .json({ error: "Les mots de passe ne correspondents pas !" });
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json({ error, message: "erreur serveur ou donnée invalide" })
      );
  } else {
    res.status(402).json({ message: "erreur token invalide" });
  }
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password -createdAt -updatedAt -__v -story")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res
        .status(401)
        .json({ err, message: "erreur serveur ou identifiant invalide" })
    );
};

exports.getAllUser = (req, res, next) => {
  User.find()
    .select("-password -createdAt -updatedAt -__v -story")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(401).json({ err }));
};

exports.getStrangerOnly = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  let contact = [];

  await Friends.find({ $or: [{ recipient: userId }, { requester: userId }] })
    .then((friends) => {
      contact.push(userId);
      for (let friend of friends) {
        if (friend.recipient == userId) {
          contact.push(friend.requester);
        } else if (friend.requester == userId) {
          contact.push(friend.recipient);
        }

        User.find({ _id: { $nin: contact } })
          .select("-password -createdAt -updatedAt -__v -story")
          .then((user) => {
            res.status(200).json(user);
          })
          .catch((err) => res.status(401).json({ err }));
      }
    })
    .catch((err) => res.status(401).json({ err }));
};

exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    User.deleteOne({ _id: userId })
      .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
      .catch((err) => res.status(401).json({ err }));
  }
};

exports.postStory = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  if (req.file === undefined) {
    return res.status(400).json({ message: "erreur fichier invalide" });
  } else {
    User.findOne({ _id: userId })
      .select("-password -createdAt -updatedAt -__v")
      .then((user) => {
        const fileName = req.file.filename;
        const fileSize = req.file.size;
        const fileType = req.file.mimetype;
        const description = req.body.description;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;

        if (user.story !== undefined) {
          const path = "uploads/" + user.story.name;
          try {
            fs.unlinkSync(path);
            //file removed
          } catch (err) {
            console.error(err);
          }
        }

        const location = {
          longitude: longitude,
          latitude: latitude,
        };

        const file = {
          name: fileName,
          description: description,
          size: fileSize,
          type: fileType,
          location: location,
        };

        user.story = file;
        user
          .save()
          .then(() => res.status(201).json(req.file))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((err) => res.status(401).json({ err }));
  }
};

exports.getStory = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    Friends.find({ $or: [{ recipient: userId }, { requester: userId }] })
      .then((friends) => {
        if (friends) {
          let friendsId = [];
          if (friends.recipient == userId) {
            friendsId.push(friends.requester);
          } else if (friends.requester == userId) {
            friendsId.push(friends.recipient);
          }

          console.log(friendsId);

          User.find({ _id: { $in: friendsId } })
            .select("-password -createdAt -updatedAt -__v")
            .then((users) => {
              res.status(200).json(users);
            })
            .catch((err) => res.status(401).json({ err }));
        }
      })
      .catch((err) => res.status(401).json({ err }));
  } else {
    res.status(402).json({ message: "erreur token invalide" });
  }
};

exports.getStoryImage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    Friends.findOne({ $or: [{ recipient: userId , requester :req.body.friendId }, { requester: userId , receiver : req.body.friendId }] })
      .then((friends) => {
        if (friends!==null) {
          let friendsId = [];  
          if (friends.recipient == userId) {
            friendsId.push(friends.requester);
          } else if (friends.requester == userId) {
            friendsId.push(friends.recipient);
          }

          User.find({ _id: { $in: friendsId } })
            .select("-password -createdAt -updatedAt -__v")
            .then((users) => {
              let fileId = "uploads/" + users.story.name;
              return res.download(fileId, users.story);
            })
            .catch((err) => res.status(401).json({ err }));
        }
      })
      .catch((err) => res.status(401).json({ err }));
  }



}

exports.myStoryImage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    User.findOne({ _id: userId })
      .select("-password -createdAt -updatedAt -__v")
      .then((user) => {
        let fileId = "uploads/" + user.story.name;
        return res.download(fileId, user.story);
      })
      .catch((err) => res.status(401).json({ err }));
  } else {
    res.status(402).json({ message: "erreur token invalide" });
  }
};

exports.myStoryInfo = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    User.findOne({ _id: userId })
      .select("-password -createdAt -updatedAt -__v")
      .then((user) => {
        res.status(200).json(user.story);
      })
      .catch((err) => res.status(401).json({ err }));
  } else {
    res.status(402).json({ message: "erreur token invalide" });
  }
};
