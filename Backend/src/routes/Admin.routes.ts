import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getAllAppointments, readAllDataAdminAppointments } from "../services/appointment.service";
import { Appointment } from "../models/Appointment.model";
import { resolveNaptr } from "dns";
import { getAllPatients } from "../services/patient.services";
import { getAllDoctors } from "../services/doctor.services";

export const AdminRouter = Router();

AdminRouter.get("/appointments",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req: Request, res : Response) => {

    const {limit = "10", offset = "0"} = req.query;

    //Cambiar los + a parse ints
    try{
        const appointments = await getAllAppointments(+limit,+offset);
        res.status(201).send(appointments);
    }catch(error)
    {
        res.status(500).send("Something went wrong");
    }

});

//This route can filter usting the patient,doctor and status of the appointment via query params, you can send any of the 3 params in whatever combination you want
AdminRouter.get("/searchAppointments/:order?",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req: Request, res: Response) => {
    try {
        
        const {PatientId, DoctorId, status} = JSON.parse(req.query.where as string || "{}")
        let {order = "ASC"} = req.params;
        const where = {PatientId,DoctorId,status};

        //This should be a foreach however i do not know how to use types so instead i need an if for every query param
        if( !where.PatientId ) {delete where.PatientId}
        if( !where.DoctorId ) {delete where.DoctorId}
        if( !where.status ) {delete where.status}

        const toSearch = await Appointment.findAll({
            where,
            order: [["id",order]]
        });

        res.status(200).send(toSearch);

    } catch (error) {
        res.send(error);
    }
});

AdminRouter.get("/patients",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req:Request, res:Response) => {
    try{
        const list = await getAllPatients();
        res.status(200).send(list)
    }catch(error){
        res.send(error)
    }
}
)

AdminRouter.get("/doctors",
isAuthenticated,
hasRole({roles: ["admin","patient"], allowSameUser:false}),
async (req:Request, res:Response) => {
    try{
        const list = await getAllDoctors();
        res.status(200).send(list)
    }catch(error){
        res.send(error)
    }
}
)

AdminRouter.get("/appointments/all/",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:true}),
async (req: Request, res:Response) => {
    try{
        const getAllAppointments = await readAllDataAdminAppointments();

        res.status(200).send(getAllAppointments);
    }catch(error){
        res.send(error)
    }
}
)