const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
const DB_NAME = config.db_name;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { userNewUrlParser: true });
        this.dbName = DB_NAME;
    }
    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection();
    }
    getAll(collection, query) {
        //retorna una insancia de la base de datos
        //tiene los metodos de mongo
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();

        })
    }
    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) }).toArray();
        })
    }
    create(collection, data) {
        return this.connect().then(db => {
            db.collection(collection).insertOne(data)
        })
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }
    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id);
    }
}
module.export = MongoLib;