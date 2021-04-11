import { sign } from 'jsonwebtoken';
import { hashSync } from 'bcryptjs';
import { secret, options } from '../config';

const registerController = (req, res) => {
    const connection = req.app.locals.db;
    const hashedPassword = hashSync(req.body.password, 8);

    connection.collection('users').insertOne({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },
        (err, user) => {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            const token = sign({ id: user._id }, secret, options);
            res.status(200).send({ auth: true, token: token });
        });
};

module.exports = registerController;