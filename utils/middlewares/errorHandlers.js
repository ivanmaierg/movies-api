/* eslint-disable no-unused-vars */
const { config } = require('../../config');

function withErrorStack(error, stack) {
    if (config.dev) {
        return { error, stack };
    }
    return error;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}
//express sabe que es un error middleware, por sus cuatro parametros
//ponerlos por mas que no estén en uso
function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json(withErrorStack(err.meesage, err.stack))
}

module.exports = {
    logErrors,
    errorHandler,
}