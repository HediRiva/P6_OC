/** initialisation d'express,
 * framework pour le développement de serveur en nodeJs
 */
const express = require('express');

/** Initialisation du router grâce à la méthode .Router()
 * d'express
 */
const router = express.Router();

/** Importation du middleware password
 * pour utilisation dans la route POST quand création d'un compte utilisateur
 */
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');

/** création des routes POST, qui servent à créer un compte utilisateur
 * et à connecter son compte utilisateur,
 * grâce à la méthode .Router() utilisée dans la constante router
 */
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
