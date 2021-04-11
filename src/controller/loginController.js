import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { secret, options } from '../config';

const loginController = (req, res) => {
    const connection = req.app.locals.db;
    const { email, password } = req.body;
    connection.collection('users').findOne({ email }, (error, result) => {
        if (error) {
            res.status(500).send('Server error: ' + error);
        }
        if (result != null) {
            const isPasswordMatch = compare(password, result.password);
            if (isPasswordMatch) {
                const token = sign({ email: result.email }, secret, options);
                res.status(200).send({ auth: true, token: token });
            } else {
                res.status(401).send({ login: false, msg: 'Invailid credential' });
            }
        } else {
            res.status(404).send({ login: false, msg: 'Invailid credential' });
        }
    });


};

module.exports = loginController;