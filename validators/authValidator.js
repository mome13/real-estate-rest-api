const { Joi } = require('express-validation');

const signupValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required(),
  }),
};

const signinValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  signupValidator,
  signinValidator,
};
