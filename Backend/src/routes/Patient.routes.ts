import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { cancelPatientAppointment, createAppointment, readAllPatientAppointments, readPatientAppointment } from "../services/appointment.service";
import { createPatient } from "../services/patient.services";

export const PatientRouter = Router();

//Creating a patient
PatientRouter.post("/create",
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
    const appointment = await createAppointment(date,hour,motive,"Pending", PatientId, DoctorId);
    res.status(201).send(appointment);
})

//Route that can be used to access all of the appointments of a patient, can only be accessed by an admin or by the usesr themself and you can paginate from here if you want sending query params of limit and offset
//Limit and offset have defaults values in the case the user does not send a default value
PatientRouter.get("/listAppointments/:patientId",
 isAuthenticated,
 hasRole({roles:[""], allowSameUser: true}),
 async (req: Request, res : Response) => {
     const {patientId} = req.params;
     let {limit, offset} = req.query;

     if(!limit) { limit = "10"}
     if(!offset) {offset = "0"}

     
     const listAppointments = await readAllPatientAppointments(+patientId,+limit,+offset);
     res.status(201).send(listAppointments);
 })

//This route it is used to get ONE specific appointment from a patient, can only be accessed by the user themself
 PatientRouter.get("/readAppointment/:patientId/:appointmentId",
 isAuthenticated,
 hasRole({roles:[""], allowSameUser: true}),
 async (req: Request, res : Response) => {
     const {patientId, appointmentId} = req.params;
     const listAppointments = await readPatientAppointment(+patientId, +appointmentId);
     res.status(201).send(listAppointments);
 })

 PatientRouter.delete("/cancelAppointment/:appointmentId",
 isAuthenticated,
 hasRole({roles:[""], allowSameUser: true}),
 async (req: Request, res : Response) => {
     const {appointmentId} = req.params;
     const listAppointments = await cancelPatientAppointment(+appointmentId,"canceled");
     res.status(201).send(listAppointments);
 })


