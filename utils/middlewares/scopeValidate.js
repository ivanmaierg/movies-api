const boom = require('@hapi/boom');

function scopesValidationHandler(allowScopes) {
    return function (req, res, next) {
        // verificar si el usuario no existe, o que sus scopes no existan
        if (!req.user || !req.user.scopes) {
            next(boom.unauthorized('Faltan los scopes'));
        }

        // Mapeo el arreglo de scopes pasados a la ruta y verifico si cada uno de esos elementos se encuentra definido en los scopes del usuario. El resultado va a ser un nuevo arreglo de elementos true y/o false
        const permisions = allowScopes.map(scope =>
            req.user.scopes.includes(scope)
        );
        //verifico que no haya elemetos false en el arreglo de permisos (es decir, todos tienen que ser true para pasar al siguiente middleware, con uno que tenga false,
        // significa que todos los permisos no se cumplen y por tanto se le niega el acceso)
        const hasAccess = !permisions.includes(false);

        if (hasAccess) {
            next();
        } else {
            next(boom.unauthorized('Insuficients scopes'));
        }
    };
}

module.exports = scopesValidationHandler;