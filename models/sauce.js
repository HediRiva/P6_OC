/** Initialisation de mongoose qui permettre d'utiliser
 * la méthode .Schema() pour modéliser les données,
 * et qui créer une connexion entre mongoDB et Express
 */
const mongoose = require('mongoose');

/** Création du schéma d'une sauce */
const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Sauce', saucesSchema);
