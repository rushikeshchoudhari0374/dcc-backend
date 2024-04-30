import express, { json } from 'express';
import verifyToken from '../middlewares/verifyToke_middleware.js';
import AccessControl from '../middlewares/userAccessControl_middleware.js';
import { ClientSpecificUserDocModel, SiteEngSpecificUserDocModel } from '../database/models/user_model.js';
import ProjectModel from '../database/models/projects_model.js'

const SiteEng_Project_Route = express.Router();
SiteEng_Project_Route.use(json());


SiteEng_Project_Route.post("/assign-siteEng-to-project", verifyToken, AccessControl.isAdminManager, async (req, res) => {
    const { clientID, siteEngID, projectID } = req.body;
    if (!clientID || !siteEngID || !projectID) {
        return res.status(400).send();
    }
    
    try {
        const client = await ClientSpecificUserDocModel.findById(clientID);
        const siteEng = await SiteEngSpecificUserDocModel.findById(siteEngID);
        const project = await ProjectModel.findById(projectID);
        if (!client || !siteEng || !project || client.id != project.client.toString()) {
            return res.status(400).send()
        }

        const existingAssignment = client.assignedSiteEngineers.find(assignment =>
            assignment.siteEng.equals(siteEngID) && assignment.project.equals(projectID)
        );

        if (existingAssignment) {
           return res.status(409).send();
        }

        const newAssignedSiteEngineer = {
            siteEng: siteEngID,
            project: projectID,
            assignedBy: req.user.id
        };

        const newAssignedClient = {
            client: clientID,
            project: projectID,
            assignedBy: req.user.id
        }

        client.assignedSiteEngineers.push(newAssignedSiteEngineer);
        siteEng.assignedClients.push(newAssignedClient);

        const clientDoc = await client.save();
        const siteEngDoc = await siteEng.save();

        res.send({
            client: clientDoc,
            siteEng: siteEngDoc
        })

    } catch (error) {
        res.status(500).send(error)
    }
})




export default SiteEng_Project_Route;