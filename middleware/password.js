/** Initialisation de password-validator qui oblige
 * l'utilisateur à créer un mot de passe fort
 */
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(5) // Minimum length 5
  .is()
  .max(20) // Maximum length 20
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not('=', '?') // Blacklist these speclials characters
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error:
        "Le mot de passe n'est pas assez fort, il manque : " +
        passwordSchema.validate('req.body.password', { list: true }),
    });
  }
};
