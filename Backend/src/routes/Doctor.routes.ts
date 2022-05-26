import {Router, Request, Response} from "express";
import { Where } from "sequelize/types/utils";
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

//List all of appointments from an specific doctor you NEED to provide a doctor id and you may provide the date or patientid to filter by them, you can add ASC or DESC as a param too
DoctorRouter.get("/listAppointments/:order?",
 isAuthenticated,
 hasRole({roles:[""], allowSameUser: true}),
 async (req: Request, res : Response) => {
     let {order} = req.params;

     const {DoctorId, date, PatientId} = JSON.parse(req.query.where as string || "{}")
     const where = {DoctorId, date, PatientId};

     if(!where.DoctorId) { res.send("Need doctor id")}
     if(!where.date) { delete where.date}
     if(!where.PatientId) { delete where.PatientId}

     if(!order) { order = "ASC"}
     if(order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC"){ order = "ASC"}

     const listAppointments = await readAllDoctorAppointments(where,order);
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
