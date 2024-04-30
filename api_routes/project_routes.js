import express, { json } from 'express'
import verifyToken from '../middlewares/verifyToke_middleware.js';
import AccessControl from '../middlewares/userAccessControl_middleware.js';
import { ClientSpecificUserDocModel } from '../database/models/user_model.js';
import ProjectModel from '../database/models/projects_model.js';

const Project_Route = express.Router();
Project_Route.use(json());


Project_Route.post("/add-project",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    const {project_name,project_address,clientID} = req.body;
    if (!project_name,!project_address,!clientID) {
        return res.status(400).send();
    }
    try {
        const client = await ClientSpecificUserDocModel.findById(clientID);
        if (!client) {
            return res.status(400).send();
        }
        const projectDoc = ProjectModel({
            projectName:project_name,
            address:project_address,
            client:clientID,
            addedBy:req.user.id
        });

        const project = await projectDoc.save()

        res.send(project);

    } catch (error) {
         res.status(500).send();
    }
});


Project_Route.put("/update-project/:projectID",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    const {project_name,project_address}=req.body;
    const {projectID} = req.params;
    if (!project_name,!project_address) {
        return res.status(400).send()
    }
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(projectID,{projectName:project_name,address:project_address},{new:true})
        res.send(updatedProject);
    } catch (error) {
        res.status(500).send();
    }
})


Project_Route.get("/get-project-list",verifyToken,AccessControl.isAdminManager,async(req,res)=>{
    try {
        const projectList = await ProjectModel.find();
        res.send(projectList);
    } catch (error) {
        res.status(500).send()
    }
})

Project_Route.get("/get-project-list-by-clientID/:clientID",verifyToken,AccessControl.isAdminManagerClient,async(req,res)=>{
    const {clientID} = req.params;
    if (!clientID) {
        return res.status(400).send()
    }
    try {
        const projectList = await ProjectModel.find({client:clientID});
        res.send(projectList);
    } catch (error) {
        res.status(500).send()
    }
})

Project_Route.get("/get-project-by-id/:projectID",verifyToken,AccessControl.isAdminManagerClient,async(req,res)=>{
    const {projectID} = req.params;
    if (!projectID) {
        return res.status(400).send();
    }
    try {
        const project = await ProjectModel.findById(projectID);
        res.send(project);
    } catch (error) {
        res.status(500).send();
    }
})






export default Project_Route