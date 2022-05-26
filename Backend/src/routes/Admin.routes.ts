import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getAllAppointments } from "../services/appointment.service";

export const AdminRouter = Router();

AdminRouter.get("/appointments",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser:false}),
async (req: Request, res : Response) => {
    const appointments = await getAllAppointments();
    res.status(201).send(appointments);
})