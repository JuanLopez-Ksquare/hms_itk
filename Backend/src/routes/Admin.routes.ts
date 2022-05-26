import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getAllAppointments } from "../services/appointment.service";
import { Appointment } from "../models/Appointment.model";

export const AdminRouter = Router();

AdminRouter.get("/appointments",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req: Request, res : Response) => {

    let {limit, offset} = req.query;

    if(!limit) { limit = "10"}
    if(!offset) {offset = "0"}


    const appointments = await getAllAppointments(+limit,+offset);
    res.status(201).send(appointments);
});

//This route can filter usting the patient,doctor and status of the appointment via query params, you can send any of the 3 params in whatever combination you want
AdminRouter.get("/searchAppointments/:order?",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req: Request, res: Response) => {
    try {
        
        const {PatientId, DoctorId, status} = JSON.parse(req.query.where as string || "{}")
        let {order} = req.params;
        const where = {PatientId,DoctorId,status};

        //This should be a foreach however i do not know how to use types so instead i need an if for every query param
        if( !where.PatientId ) {delete where.PatientId}
        if( !where.DoctorId ) {delete where.DoctorId}
        if( !where.status ) {delete where.status}

        if(!order) { order = "ASC"}
        if(order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC"){ order = "ASC"}

        const toSearch = await Appointment.findAll({
            where,
            order: [["id",order]]
        });

        res.status(200).send(toSearch);

    } catch (error) {
        res.send(error);
    }
});

