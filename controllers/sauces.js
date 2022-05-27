/** Importation du model Sauce */
const Sauce = require('../models/Sauce');

/** Initialisation du module fs,
 * qui permet, dans ce cas, de "unlink" les images une fois
 * que l'utilisateur efface une sauce du site
 */
const fs = require('fs');

/** Fonction POST pour création d'une sauce */
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  delete sauceObject._id;

  /** Utilisation du model Sauce et de l'objet sauceObject
   * pour création de la sauce une fois tout les champs
   * remplis par l'user
   */
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    userLiked: [''],
    userDisliked: [''],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};

/** Fonction PUT pour modification de la sauce
 * seulement par l'user qui a crée la sauce
 */
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch((error) => res.status(400).json({ error }));
};

/** Fonction DELETE pour suppresion de la sauce
 * seulement par l'user qui a crée la sauce
 */
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

/** Fonction GET pour affichage d'une sauce grâce à son Id */
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

/** Fonction GET pour affichage de toutes les sauces crées */
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

/** Fonction pour liker ou pas une sauce */
exports.likeSauce = (req, res, next) => {
  /** Si la requête envoyée est un like
   * on modifie et on ajoute un like à la sauce
   */
  if (req.body.like == 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
    )
      .then(() => res.status(200).json({ message: 'Sauce liké !' }))
      .catch((error) => res.status(400).json({ error }));
  }
  /** Si la requête envoyée est ni like ni dislike
   * on vérifie l'état actuel de la notation de la sauce,
   * si il y a un like ou un dislike on les retire pour arriver à 0
   */
  if (req.body.like == 0) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: 'Like retiré !' }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: 'Like retiré !' }))
            .catch((error) => res.status(404).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
  /** Si la requête envoyée correspond à un dislike,
   * on ajoute un dislike à la sauce
   */
  if (req.body.like == -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }
    )
      .then(() => res.status(200).json({ message: 'Sauce disliké !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};
