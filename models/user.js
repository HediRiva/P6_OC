const mongoose = require('mongoose');

/** Initialisation de mongoose-unique-validator
 * qui permet de nous assurer que l'email de chaque utilisateur
 * qui créera un compte est unique
 */
const uniqueValidator = require('mongoose-unique-validator');

/** Initialisation du schéma des données de l'utilisateur
 * grâce à la méthode .Schema() de mongoose
 */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
