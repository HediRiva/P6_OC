/** Initialisation de bcrypt, qui permettre de crypter
 * le mot de passe afin qu'il n'apparaisse pas en clair
 * dans la base de données
 */
const bcrypt = require('bcrypt');

/** Initialisation de Jsonwebtoken,
 * c'est un access token qui permettra un échange
 * d'information de manière sécurisée
 */
const jwt = require('jsonwebtoken');

/** Initialisation de cryptoJs qui nous servira à crypter l'email
 * pour éviter qu'il n'apparaisse en clair dans la base de données
 */
const cryptoJs = require('crypto-js');

/** initialisation de .env pour mise en place
 * des variables d'environnement
 */
require('dotenv').config();

/** Importation du model User */
const User = require('../models/user');

/** fonction pour création de compte utilisateur (signup) */
exports.signup = (req, res, next) => {
  /** Chiffrer l'email de la requête avec cryptoJs */
  const cryptedEmail = cryptoJs
    .HmacSHA256(req.body.email, process.env.SECRET_KEY)
    .toString();
  bcrypt
    /** On hash le mot de passe avec bcrypt et on le salt 10 fois,
     * le mot de passe ne sera pas affiché en clair
     * dans la base de données
     */
    .hash(req.body.password, 10)
    /** Création du compte utilisateur et envoie des données
     * email et password chiffrés vers la base de données
     */
    .then((hash) => {
      const user = new User({
        email: cryptedEmail,
        password: hash,
      });
      console.log(user);
      user
        .save()
        .then(() =>
          res.status(201).json({ message: 'Utilisateur enregistré !' })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/** fonction pour connection de l'utilisateur au site (login) */
exports.login = (req, res, next) => {
  const cryptedEmail = cryptoJs
    .HmacSHA256(req.body.email, process.env.SECRET_KEY)
    .toString();

  /** Chercher dans la base de données si l'user est bien présent */
  User.findOne({ email: cryptedEmail })
    .then((user) => {
      /** Si l'email de l'user n'existe pas,
       * on renvoie un status 401
       */
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      }

      /** On compare le password de la requête et celui de l'user,
       * si ils ne sont pas similaires, on renvoie un status
       * 401
       */
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Mot de passe incorrect !' });
          }
          /** S'ils sont similaires, une response est renvoyée
           * avec l'userId et le token valable 24h
           */
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.MY_TOKEN, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
