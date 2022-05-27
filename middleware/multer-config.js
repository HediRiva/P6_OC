/** Initialisation de multer
 * c'est un package de gestion de fichiers.
 * Grâce à sa méthode .diskStorage(),
 * on pourra configurer les chemins et les noms des fichiers entrants
 */
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

/** On définit la destination et le nom que l'on donnera
 * à nos fichiers entrants */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage }).single('image');
