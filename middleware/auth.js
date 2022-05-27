/** Initialisation de Jsonwebtoken,
 * c'est un access token qui permettra un échange
 * d'information de manière sécurisée
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();

/** Fonction de création du token d'authentification
 * qui servira à authentifier les actions des différents users
 */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.MY_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
