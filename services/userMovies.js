const MongoLib = require('../lib/mongo');
class UserMoviesService {
    constructor() {
        this.collection = 'user-movies';
        this.mongoDB = new MongoLib();
    }
    async getUserMovies({ userId }) {
        // traer peliculas del usuario que tengan como 
        // id las peliculas del usuario
        const query = userId && { userId };
        const userMovies = await this.mongoDB.getAll(this.collection, query);
        //devuelve user movies, si no las hay []
        return userMovies || [];
    }
    async createUserMovie({ userMovie }) {
        const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie);
        return createdUserMovieId;
    }
    async deleteUserMovie({ userMovieId }) {
        const deletedUserMovieId = await this.mongoDB.create(
            this.collection, userMovieId
        );
        return deletedUserMovieId;
    }
}

module.exports = UserMoviesService;