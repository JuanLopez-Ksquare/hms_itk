import { where } from "sequelize/types";
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

export const getAppointment = async (
    appointmentId : number
) => {
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        return appointment;
    } catch (error) {
        return error;
    }
}

 //////////////////////////////////////////////////   USER APPOINTMENTS //////////////////////////////////////////////////////////////
//The user can read all of his appointments
export const readAllPatientAppointments = async (
    patientId : number
) => {
    try {
        const listAppointment = await Appointment.findAll({where:{
            PatientId: patientId
        }});

        return listAppointment;

    } catch (error) {
        return error;
    }
}

//The user can read an specific appointment, you need to give the user id and then the appointment id
export const readPatientAppointment = async (
    patientId : number,
    appointmentId : number
) => {
    try {
        const listAppointment = await Appointment.findOne({where:{
            PatientId: patientId,
            id : appointmentId
        }});

        return listAppointment;

    } catch (error) {
        return error;
    }
}

export const cancelPatientAppointment = async (
    appointmentId : number,
    status : string
) => {
    try {
        const appointment = await Appointment.update(
            {
                status : status
            },
            {
                where: {id : appointmentId}
            }
        )

        return appointment;
    } catch (error) {
        return error;
    }
}

////////////////////////////////////////////////// DOCTOR APPOINTMENTS //////////////////////////////////////////

//Read all appointsment from a specific doctor
export const readAllDoctorAppointments = async (
    doctorId : number
) => {
    try {
        const listAppointment = await Appointment.findAll({where:{
            DoctorId: doctorId
        }});

        return listAppointment;

    } catch (error) {
        return error;
    }
}

export const udpateDateAppointment = async(
    appointmentId : number,
    date : Date,
    hour : string
) => {
    try {
        const appointment = await Appointment.update(
            {
                date : date,
                hour : hour
            },
            {
                where: {id : appointmentId}
            }
        )

        return appointment;
    } catch (error) {
        
    }
}



///////////////////////////////////////////////// ADMIN APPOINTMENTS ////////////////////////////////

export const getAllAppointments = async() => {
    try{
        const appointments = await Appointment.findAll({order: ["id"]});

        return appointments;
    }catch(error){
        return error;
    }
}