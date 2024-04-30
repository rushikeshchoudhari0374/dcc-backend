import express, { json } from 'express';
import verifyToken from '../middlewares/verifyToke_middleware.js';
import AccessControl from '../middlewares/userAccessControl_middleware.js';
import { addUserController,userListController,userByIdController } from './controllers/user_controller.js';
import { ClientSpecificUserDocModel, ManagerSpecificUserDocModel, SiteEngSpecificUserDocModel } from '../database/models/user_model.js';

const User_Route = express.Router();
User_Route.use(json());


User_Route.post("/add-manager", verifyToken, AccessControl.isAdmin, addUserController.addManager)

User_Route.post("/add-client", verifyToken, AccessControl.isAdminManager, addUserController.addClient)

User_Route.post("/add-site-engineer", verifyToken, AccessControl.isAdminManager, addUserController.addSiteEng )

User_Route.get("/get-client-list",verifyToken,AccessControl.isAdminManager,userListController.getClientList)


User_Route.get("/get-site-engineer-list",verifyToken,AccessControl.isAdminManager,userListController.getSiteEngList)

User_Route.get("/get-manager-list",verifyToken,AccessControl.isAdmin,userListController.getManagerList)



User_Route.get("/get-client-by-id/:clientID",verifyToken,AccessControl.isAdminManager,userByIdController.getClientByID)


User_Route.get("/get-site-eng-by-id/:siteEngID",verifyToken,AccessControl.isAdminManager, userByIdController.getSiteEngById)

User_Route.get("/get-manager-by-id/:managerID",verifyToken,AccessControl.isAdmin,userByIdController.getManagerById)


User_Route.put("/block-site-eng-by-id/:siteEngID",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    const {siteEngID} = req.params;
    try {
        await SiteEngSpecificUserDocModel.findByIdAndUpdate(siteEngID,{is_active:false})
        res.send("blocked")
    } catch (error) {
        res.status(500).send("")
    }   
})


User_Route.put("/unblock-site-eng-by-id/:siteEngID",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    const {siteEngID} = req.params;
    try {
        await SiteEngSpecificUserDocModel.findByIdAndUpdate(siteEngID,{is_active:true})
        res.send("unblocked")
    } catch (error) {
        res.status(500).send("")
    }   
})


User_Route.put("/block-manager-by-id/:managerID",verifyToken,AccessControl.isAdmin,async(req,res)=>{
    const {managerID} = req.params;
    try {
        await ManagerSpecificUserDocModel.findByIdAndUpdate(managerID,{is_active:false})
        res.send("blocked")
    } catch (error) {
        res.status(500).send("")
    }   
})


User_Route.put("/unblock-manager-by-id/:managerID",verifyToken,AccessControl.isAdmin,async(req,res)=>{
    const {managerID} = req.params;
    try {
        await ManagerSpecificUserDocModel.findByIdAndUpdate(managerID,{is_active:true})
        res.send("unblocked")
    } catch (error) {
        res.status(500).send("")
    }   
})



User_Route.put("/block-client-by-id/:clientID",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    const {clientID} = req.params;
    try {
        await ClientSpecificUserDocModel.findByIdAndUpdate(clientID,{is_active:false})
        res.send("blocked")
    } catch (error) {
        res.status(500).send("")
    }   
})


User_Route.put("/unblock-client-by-id/:clientID",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    const {clientID} = req.params;
    try {
        await ClientSpecificUserDocModel.findByIdAndUpdate(clientID,{is_active:true})
        res.send("unblocked")
    } catch (error) {
        res.status(500).send("")
    }   
})



export default User_Route