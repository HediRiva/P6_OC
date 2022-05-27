/** initialisation d'express,
 * framework pour le développement de serveur en nodeJs
 */
const express = require('express');

/** Initialisation du router grâce à la méthode .Router()
 * d'express
 */
const router = express.Router();

/** Importation de sauceCtrl, auth et multer pour utilisation
 * dans les routes appropriées
 */
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/** création des différentes routes utiles à l'API
 * grâce à la méthode .Router() utilisée dans la constante router
 */
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', sauceCtrl.likeSauce);

module.exports = router;
