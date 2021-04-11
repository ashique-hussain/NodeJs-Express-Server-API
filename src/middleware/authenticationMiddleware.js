import { verify } from 'jsonwebtoken';
import { secret, options } from '../config';

const authenticationMiddleware = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
        const token = authorizationHeaader.split(' ')[1]; // Bearer <token>
        try {
            result = verify(token, secret, options);
            next();
        } catch (err) {
            return res.status(500).send({ data: { status: 'token verification failed' } });
        }
    } else {
        result = {
            error: `Unauthorized access denied`,
            erroCode: 401,
        };
        res.status(401).send(result);
    }
};

module.exports = authenticationMiddleware;