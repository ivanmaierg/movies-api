const express = require('express');
const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middlewares/validationHandler');


const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');
const passport = require('passport');
const scopesValidationHandler = require('../utils/middlewares/scopeValidate');



function userMoviesApi(app) {
    const router = express.Router();
    app.use('/api/user-movies', router);
    const userMoviesService = new UserMoviesService();
    router.get('/', validationHandler({ userId: userIdSchema }, 'query'),
        async function (req, res, next) {
            const { userId } = req.query;
            try {
                const userMovies = await userMoviesService.getUserMovies({ userId });
                res.status(200).json({
                    data: userMovies,
                    message: 'user movies listed'
                });
            } catch (error) {
                next(error);
            }
        }
    )
    router.post('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['create:user-movies']),validationHandler(createUserMovieSchema), async function (req, res, next) {
        const { body: userMovie } = req;
        try {
            const createdUserMovieId = await userMoviesService.createdUserMovie({ userMovie })
            res.status(201).json({
                data: createdUserMovieId,
                message: 'user movie created',
            });
        } catch (err) {
            next(err);
        }
    });
    router.delete('/:userMovieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete:user-movies']), validationHandler(createUserMovieSchema), validationHandler({ userMovieId: movieIdSchema }, 'params'),
        async function (req, res, next) {
            const { userMovieId } = req.params;
            try {
                const deletedUserMovieId = await userMoviesService.deleteUserMovie({
                    userMovieId
                });
                res.status(200).json({
                    data: deletedUserMovieId,
                    message: 'user movie deleted'
                })
            } catch (err) {
                next(err);
            }
        })
}

module.exports = userMoviesApi;
