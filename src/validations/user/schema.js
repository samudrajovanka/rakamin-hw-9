const Joi = require('joi');

exports.update = Joi.object({
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Female', 'Male').required(),
  role: Joi.string().required(),
});
