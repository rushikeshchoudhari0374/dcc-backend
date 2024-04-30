import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connect_db from './database/db connection/db_connection.js';
import { Auth_Routes } from './api_routes/auth_routes.js';
import User_Route from './api_routes/user_routes.js';
import Project_Route from './api_routes/project_routes.js';
import SiteEng_Project_Route from './api_routes/siteeng_project_routes.js';
import Schedule_Routes from './api_routes/schedule_routes.js';
// import { createUser } from './database/models/user_model.js';
// import bcrypt from 'bcrypt';

dotenv.config();
const app = express();

app.use(cors());

Connect_db(process.env.DATABASE_URL, process.env.DATABASE_NAME)

app.use("/auth",Auth_Routes)
app.use("/user",User_Route)
app.use("/project",Project_Route)
app.use("/assign",SiteEng_Project_Route)
app.use("/schedule",Schedule_Routes)

// addDATA();
// await  createUser("admin",{name:"rushikesh choudhari",email:"rushikeshchoudhari0374@gmail.com",mobile_no:"9373070374",password: await bcrypt.hash("rushi",10),address:"at paithan"})

app.use((err, req, res, next) => {
    res.status(500).send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("server is running...");
});