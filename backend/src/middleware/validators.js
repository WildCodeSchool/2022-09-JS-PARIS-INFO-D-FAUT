const Joi = require("joi");

const userSchema = Joi.object({
  cp: Joi.string()
    .min(8)
    .max(8)
    .pattern(/^[0-9]{7}[a-zA-Z]{1}$/)
    .rule({ message: "Le CP doit etre composé de 7 chiffres et une lettre" })
    .required(),
  mail: Joi.string()
    .email()
    .max(255)
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .rule({ message: "le mail n est pas valide" })
    .required(),
  phone_number: Joi.string()
    .max(10)
    .pattern(/^$|^[0-9]{10}$/)
    .rule({
      message: "le téléphone n est pas valide il doit contenir 10 chiffres",
    }),
  password: Joi.string()
    .min(8)
    .max(255)
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-.:;,+!?*$@%_])([-.:;,+!?*$@%_\w]{8,})$/
    )
    .rule({
      message:
        "Le mot de passe doit contenir au minimum: une majuscule, une minuscule, un chiffre, un caractère spécial parmi : -.:;,+!?*$@%_ et doit contenir minimum 8 caractères",
    })
    .required(),
});

const validateUser = (req, res, next) => {
  const { cp, mail, phone_number, password } = req.body;

  const { error } = userSchema.validate(
    { cp, mail, phone_number, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
};
