import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getAppointment, readAllDoctorAppointments, udpateDateAppointment } from "../services/appointment.service";
import { createDoctor } from "../services/doctor.services";

export const DoctorRouter = Router();

DoctorRouter.post("/create", 
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req: Request, res : Response) => {
    const {especialization, profesionalLicence, ProfileId} = req.body;
    const doctor = await createDoctor(especialization,profesionalLicence,ProfileId);
    res.status(201).send(doctor);
})

//List all of appointments from an specific doctor
DoctorRouter.get("/listAppointments/:doctorId",
 isAuthenticated,
 hasRole({roles:[""], allowSameUser: true}),
 async (req: Request, res : Response) => {
     const {doctorId} = req.params;
     const listAppointments = await readAllDoctorAppointments(+doctorId);
     res.status(201).send(listAppointments);
 })

 //Change hour or date from an appointment
 DoctorRouter.patch("/updateAppointment/:appointmentId",
 isAuthenticated,
 hasRole({roles:[""], allowSameUser: true}),
 async (req: Request, res : Response) => {
     const { appointmentId} = req.params;
     let { date, hour} = req.body;

    const originalAppointment : any = await getAppointment(+appointmentId);

     if( !date ) { date = originalAppointment.date}
     if( !hour) { hour = originalAppointment.hour}

     const appointment = await udpateDateAppointment(+appointmentId,date,hour);

     res.status(201).send(await getAppointment(+appointmentId));

 })
