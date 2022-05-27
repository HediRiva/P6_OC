/** initialisation de .env pour mise en place
 * des variables d'environnement
 */
require('dotenv').config();

/** initialisation d'express,
 * framework pour le développement de serveur en nodeJs
 */
const express = require('express');
/** Initialisation de mongoose qui permettre d'utiliser
 * la méthode .Schema() pour modéliser les données,
 * et qui créer une connexion entre mongoDB et Express
 */
const mongoose = require('mongoose');

/** Initialisation de path grâce à Express,
 * cela sert à indiquer un chemin à suivre pour un élement du serveur.
 * Ici on s'en sert pour indiquer le chemin du dossier '/images'
 */
const path = require('path');

/** Importation des routes user et sauces */
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

/** Initialisation de mongoose et connection à mongoDB grâce
 * à la méthode .connect()
 */
mongoose
  .connect(process.env.MongoDB_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à mongoDB échouée !'));

/** Configuration de CORS (Cross Origin Ressource Sharing)
 * qui permet aux ressources de serveurs, qui n'ont pas la
 * même origine, d'intéragir entre eux
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
