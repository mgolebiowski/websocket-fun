const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    body: Joi.string().min(0).max(30).required(),
    author: Joi.string().min(0).max(6).required(),
});
