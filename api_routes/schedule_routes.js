import express, { json } from 'express';
import verifyToken from '../middlewares/verifyToke_middleware.js';
import AccessControl from '../middlewares/userAccessControl_middleware.js'
import ProjectModel from '../database/models/projects_model.js';
import ScheduleFormModel from '../database/models/schedule_fom_model.js';
import { getTestID, getTestName } from '../constants/test_constant.js';

const Schedule_Routes = express.Router();
Schedule_Routes.use(json());


Schedule_Routes.post("/add-single-test-schedule/:testID", verifyToken, AccessControl.isSiteEng, async (req, res) => {
    const { projectID, scheduledDate, } = req.body;
    const { testID } = req.params;

    if (!projectID || !scheduledDate || !testID || getTestName(testID)) {
        return res.status(400).send();
    }

    const isProjectAvailable = req.user.assignedClients.find(assignedClient =>
        assignedClient.project.equals(projectID)
    );
    // console.log(isProjectAvailable);
    if (!isProjectAvailable) {
        return res.status(400).send("not available project");
    }

    // const scheduledDat = new Date("02/06/2002");
    // scheduledDat.setHours(0, 0, 0, 0);

    const scheduleDoc = ScheduleFormModel({
        siteEng: req.user.id,
        testID: testID,
        projectID: projectID,
        clientID: isProjectAvailable.client,
        // ScheduledDate: scheduledDat
    })

    const schedule = await scheduleDoc.save();

    res.send(schedule);
    // if (condition) {

    // }

});















export default Schedule_Routes;