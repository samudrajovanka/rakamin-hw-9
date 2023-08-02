const Joi = require('joi');

exports.register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .label('confirmPassword')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  gender: Joi.string().valid('Female', 'Male').required(),
  role: Joi.string().required(),
});

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
