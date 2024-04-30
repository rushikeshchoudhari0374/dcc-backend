import jwt from 'jsonwebtoken';
import { userModel } from '../database/models/user_model.js';

const verifyToken = async (req,res,next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send();
    }
    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);
        const user = await userModel.findById(decoded.userId);
        if (!user || user.token_code!=decoded.token_code) {
            return res.status(401).send();
        }
        req.user = user;
        console.log(user.id);
        next();
        
    } catch (error) {
        res.status(500).send();
    }
}

export default verifyToken