const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

// const USER = encodeURIComponent(config.db_user);
// const PASSWORD = encodeURIComponent(config.db_password);
const DB_NAME = config.db_name;

const MONGO_URI = 'mongodb://127.0.0.1:27017';
// `mongodb+srv://${USER}:${PASSWORD}@${config.db_host}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    };
    async connect() {
        if (!this.db) {
            await new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    this.db = this.client.db(this.dbName);
                    console.log("Connected successfuly to mongo");
                    resolve(true);
                })
            })
        }
        return this.db;
    }
    getAll(collection, query) {
        //retorna una instancia de la base de datos
        //tiene los metodos de mongo
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        });
    }
    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
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
module.exports = MongoLib;