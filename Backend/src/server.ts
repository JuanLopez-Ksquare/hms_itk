import express, {Request, Response} from "express";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import {initSequelize} from "./models/index"
import { UserRouter } from "./routes/Users.routes";
import { ProfileRouter } from "./routes/Profile.routes";
import { PatientRouter } from "./routes/Patient.routes";
import { DoctorRouter } from "./routes/Doctor.routes";
import { AdminRouter } from "./routes/Admin.routes";
import cors from "cors"

dotenv.config();

const app = express();

admin.initializeApp();


const port = process.env.PORT;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_hostname = <string>process.env.DB_HOSTNAME;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/users",UserRouter);
app.use("/profile",ProfileRouter);
app.use("/patient",PatientRouter);
app.use("/doctor", DoctorRouter);
app.use("/admin", AdminRouter);

app.listen(port, () =>{
    try {
        initSequelize(db_name,db_username,db_password,db_hostname);
        console.log("Up and running on " + port);
    } catch (error) {
        console.error(error);
        process.abort();
    }
})
