/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
    if (config.dev) {
        return { ...error, stack };
    }
    return error;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}
//express sabe que es un error middleware, por sus cuatro parametros
//ponerlos por mas que no estén en uso

function wrapError(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}
function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err;

    res.status(statusCode || 500);
    res.json(withErrorStack(payload, err.stack))
}

module.exports = {
    logErrors,
    wrapError,
    errorHandler,
}