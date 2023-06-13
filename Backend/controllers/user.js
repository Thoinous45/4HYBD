const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;

  if (decodedToken) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        if(req.body.password === req.body.password_confirmation) {
          
        const user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
        };

          User
          .updateOne({ _id: userId }, user)
          .then(() =>
            res.status(201).json({ message: "Utilisateur modifié !" ,user , userId})
          )
          .catch((err) => res.status(401).json({ err }));
        } else {
          return res.status(401).json({ error: "Les mots de passe ne correspondents pas !" });
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
    .select("-password -friends")
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
    .select("-password -friends")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(401).json({ err }));
};

exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

  if (decodedToken) {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
      .catch((err) => res.status(401).json({ err }));
  }
};
