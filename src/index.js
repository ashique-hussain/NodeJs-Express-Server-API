import express from "express"
import path from "path";
import cors from "cors";
import { MongoClient } from 'mongodb';
import registerController from './controller/registerController';
import loginController from './controller/loginController';
import { productPostController, productGetController } from './controller/productController';
import authenticationMiddleware from './middleware/authenticationMiddleware';
import profileController from './controller/profileController';

const bodyParser = require('body-parser');

const url = "mongodb://localhost:27017/";

const port = 3000;

export const app = express();

//middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
    res.send('Hello Express server!')
});

app.post('/api/v1/register', registerController);
app.post('/api/v1/login', loginController);
app.get('/api/v1/profile', authenticationMiddleware, profileController);
app.post('/api/v1/product', authenticationMiddleware, productPostController);
app.get('/api/v1/product', productGetController);

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    console.log('database connected successfully')
    app.listen(port, () => {
        console.log(`Server running on : http://localhost:${port}`);
    });
    const dbo = db.db("mydb");
    app.locals.db = dbo;
});