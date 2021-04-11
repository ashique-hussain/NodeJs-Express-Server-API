import { MongoClient } from 'mongodb';
import { app } from './index'
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    app.locals.db = db;
});