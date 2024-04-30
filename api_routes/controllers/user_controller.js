import bcrypt from 'bcrypt';
import { ClientSpecificUserDocModel,SiteEngSpecificUserDocModel,ManagerSpecificUserDocModel,createUser } from '../../database/models/user_model.js';


export class addUserController {

    static addManager = async (req, res) => {
        const { name, mobile_no, email, password } = req.body;
        if (!name, !mobile_no, !email, !password) {
            return res.status(400).send();
        }
        try {

            const hashPass = await bcrypt.hash(password, 6);
            const userData = {
                name: name,
                mobile_no: mobile_no,
                email: email,
                password: hashPass
            }

            const manager = await createUser("manager", userData);
            res.status(201).send(manager);

        } catch (error) {
            res.status(500).send()
        }
    }


    static addClient = async (req, res) => {
        const { name, mobile_no, email, password, address, company } = req.body;
        if (!name, !mobile_no, !email, !password, !address, !company) {
            return res.status(400).send();
        }
        try {

            const hashPass = await bcrypt.hash(password, 6);
            const userData = {
                name: name,
                mobile_no: mobile_no,
                email: email,
                address: address,
                company: company,
                password: hashPass
            }

            const client = await createUser("client", userData);
            res.status(201).send(client);

        } catch (error) {
            res.status(500).send()
        }
    }


    static addSiteEng = async (req, res) => {
        const { name, mobile_no, email, password, address, qualification } = req.body;
        if (!name, !mobile_no, !email, !password, !address, !qualification) {
            return res.status(400).send();
        }
        try {
            
            const hashPass = await bcrypt.hash(password, 6);
            const userData = {
                name: name,
                mobile_no: mobile_no,
                email: email,
                address: address,
                qualification: qualification,
                password: hashPass
            }
            
            console.log("hello");
            const siteEng = await createUser("site-engineer", userData);
            res.status(201).send(siteEng);

        } catch (error) {
            res.status(500).send()
        }
    }


}

export class userListController {
    static getClientList = async (req, res) => {
        try {
            const clientList = await ClientSpecificUserDocModel.find();
            res.send(clientList);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getSiteEngList = async (req, res) => {
        try {
            const siteEngList = await SiteEngSpecificUserDocModel.find();
            res.send(siteEngList);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getManagerList = async (req, res) => {
        try {
            const managerList = await ManagerSpecificUserDocModel.find();
            res.send(managerList);
        } catch (error) {
            res.status(500).send();
        }
    }
}

export class userByIdController {
    static getClientByID = async (req, res) => {
        const { clientID } = req.params;
        if (!clientID) {
            return res.status(400).send();
        }
        try {
            const client = await ClientSpecificUserDocModel.findById(clientID);
            res.send(client);
        } catch (error) {
            res.status(500).send()
        }
    }

    static getManagerById = async (req, res) => {
        const { managerID } = req.params;
        if (!managerID) {
            return res.status(400).send();
        }
        try {
            const manager = await ManagerSpecificUserDocModel.findById(managerID);
            res.send(manager);
        } catch (error) {
            res.status(500).send()
        }
    }

    static getSiteEngById = async (req, res) => {
        const { siteEngID } = req.params;
        if (!siteEngID) {
            return res.status(400).send();
        }
        try {
            const siteEng = await SiteEngSpecificUserDocModel.findById(siteEngID);
            res.send(siteEng);
        } catch (error) {
            res.status(500).send()
        }
    }
}