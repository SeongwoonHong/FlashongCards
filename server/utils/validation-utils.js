const Joi = require('joi');

module.exports = {
  isUsername:  Joi.string().regex(/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{4,20}/).required(),
  isPassword: Joi.string().min(6).max(20).required(),
}
