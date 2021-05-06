/* eslint-disable no-unused-vars */
const joi = require('@hapi/joi');
const { string } = require('@hapi/joi');

// regex para definir un Id de mongo;
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

const createUserSchema = {
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    isAdmin:joi.boolean(),
}

module.exports = {
    userIdSchema,
    createUserSchema
}