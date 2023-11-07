const Joi = require("joi");

const validateUser = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().min(5).max(255).required(),
});

const validateChat = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

module.exports.validateUser = validateUser;
module.exports.validateChat = validateChat;
