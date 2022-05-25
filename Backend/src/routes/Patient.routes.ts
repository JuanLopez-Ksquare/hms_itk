import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Appointment } from "../models/Appointment.model";
import { createAppointment } from "../services/appointment.service";
import { createPatient } from "../services/patient.services";

export const PatientRouter = Router();

//Creating a patient
PatientRouter.post("/createPatient",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser : true}),
async (req: Request, res: Response) => {
    const {age,gender,medicalHistory,ProfileId} = req.body;
    const patient = await createPatient(age,gender,medicalHistory,ProfileId);
    res.status(201).send(patient);
})

//Route to access the create appointment method, we need to be an admin or be the user logged in to the app
PatientRouter.post("/createAppointment", 
isAuthenticated,
hasRole({roles : ["admin", "patient"], allowSameUser : true}),
async (req: Request, res: Response) => {
    const {date, hour, motive, PatientId, DoctorId} = req.body;
    const appointment = await createAppointment(date,hour,motive, PatientId, DoctorId);
    res.status(201).send(appointment);
})

