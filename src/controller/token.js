import { sign } from 'jsonwebtoken';
import { secret, options } from '../config';


const Token = (email) => {
    const payload = { email };
    return sign(payload, secret, options);
}


export default Token;