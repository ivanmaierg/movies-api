const MongoLib = require('../lib/mongo');
class ApiKeysService {
    constructor() {
        this.collection = 'api-keys';
        this.mongoDb = new MongoLib();
    }
    // retorna la key pasandole el token
    async getApiKey({ token }) {
        const [apiKey] = await this.mongoDb.getAll(this.collection, { token });
        return apiKey;
    }
}
module.exports = ApiKeysService;