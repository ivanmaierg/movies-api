const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
    async getMovies() {
        const movies = await Promise.resolve(moviesMock);
        return movies || [];
    }
    async getMovie() {
        const movie = await Promise.resolve(moviesMock[0].id);
        return movie || {};
    }
    async createMovie() {
        const createMovieId = await Promise.resolve(moviesMock[0].id);
        return createMovieId;
    }
    async updateMovie() {
        const updateMovieId = await Promise.resolve(moviesMock[0].id);
        return updateMovieId;
    }
    async delete() {
        const deleteMovieId = await Promise.resolve(moviesMock[0].id);
        return deleteMovieId;
    }
}
module.exports = {
   MoviesService
}