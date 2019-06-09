const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    body: Joi.string().min(1).max(60).required(),
    author: Joi.string().min(1).max(6).required(),
});
