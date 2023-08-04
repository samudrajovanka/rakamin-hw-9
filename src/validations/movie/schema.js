const Joi = require('joi');

exports.create = Joi.object({
  title: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).min(1).required(),
  year: Joi.string().required(),
});

exports.update = Joi.object({
  title: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).min(1).required(),
  year: Joi.string().required(),
});
