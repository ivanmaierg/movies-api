const boom = require('@hapi/boom')
const joi = require('@hapi/joi');
function validationHandler(schema, data = 'body') {
    return async (req, res, next) => {
        try {
            await joi.object(schema).validate(data)
            next();
        } catch (err) {
            next(boom.badRequest(err))
        }
    }
}


module.exports = validationHandler;