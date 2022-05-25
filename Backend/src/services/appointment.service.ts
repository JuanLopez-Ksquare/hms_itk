import { Appointment } from "../models/Appointment.model";

export const createAppointment = async (
    date: Date,
    hour: string,
    motive: string,
    status: string,
    PatientId?: number,
    DoctorId? : number
) => {
    try {
        const appointment = await Appointment.create({
            date,
            hour,
            motive,
            status,
            PatientId,
            DoctorId
        });
        return appointment;
    } catch (error) {
        return error;
    }
    
};