import express, { json } from 'express';
import { LoginController } from './controllers/auth_controller.js';
import verifyToken from '../middlewares/verifyToke_middleware.js';
import AccessControl from '../middlewares/userAccessControl_middleware.js';


export const Auth_Routes = express.Router();

Auth_Routes.use(json());


Auth_Routes.post("/login",LoginController);
Auth_Routes.get("/verify",verifyToken,(req,res)=>{
    res.send(req.user)
})


// Auth_Routes.post("/verify-token",(req,res)=>{});