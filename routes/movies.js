const express = require('express');


const MoviesService = require('../services/movies');
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');
const validationHandler = require('../utils/middlewares/validationHandler');
const scopesValidationHandler = require('../utils/middlewares/scopeValidate');

const cacheResponse = require('../utils/cacheResponse');

const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

const passport = require('passport');

// JWT Strategy
require('../utils/auth/strategies/jwt');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies/', router);
    const moviesService = new MoviesService();

    router.get('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read:user-movies']), async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });;
            res.status(200).json({
                data: movies,
                message: 'movies listed',
            });
        } catch (err) {
            next(err);
        }
    });
    router.get(
        '/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read:movies']), validationHandler({ movieId: movieIdSchema }, 'params'),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
            const { movieId } = req.params;
            try {
                const movie = await moviesService.getMovie({ movieId })
                res.status(200).json({
                    movie: movie,
                    message: 'movie by id'
                })
            } catch (error) {
                next(error);
            }
        }
    )
    router.post('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['create:movies']), validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            const createdMovieId = await moviesService.createMovie({ movie });
            res.status(200).json({
                data: createdMovieId,
                message: 'movie created',
            })
        } catch (err) {
            next(err);
        }
    });
    router.put('/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['update:movies']), validationHandler({ moviId: movieIdSchema }), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated',
            })
        } catch (err) {
            next(err);
        }
    });
    router.delete('/:movieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete:movies']), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId })
            res.status(200).json({
                data: deletedMovieId,
                message: `movie deleted with id ${deletedMovieId}`
            });
        } catch (error) {
            next(error);
        }
    });

}
module.exports = moviesApi