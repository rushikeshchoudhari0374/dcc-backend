import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../../database/models/user_model.js';



const generateToken = (userId,role,token_code) => {
    
    const payload = {
        userId: userId,
        token_code:token_code,
        role:role
    };

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 

    return token;
};

const generateTokenCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

export const LoginController = async (req,res) => {
    const {email,password,role} = req.body;
    if (!email || !password || !role) {
        return res.status(400).send();
    }
    try {
        const user = await userModel.findOne({email:email})
        if (!user) {
            return res.status(401).send();
        }
        if (!user.is_active) {
            return res.status(401).send("you are blocked")
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword || user.role!=role) {
            return res.status(401).send();
        }
        const token_code = generateTokenCode();
        await userModel.findByIdAndUpdate(user.id,{token_code:token_code})
        const token = generateToken(user.id,user,token_code,user.role);
        res.send({
            token:token,
            role:role,
            id:user.id,
            name:user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error");
    }
}