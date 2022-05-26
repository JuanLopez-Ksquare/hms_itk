import { Sequelize } from "sequelize";
import { initProfileModel } from "../models/Profile.model";
import { initAppointmentModel } from "./Appointment.model";
import { initDoctorModel } from "./Doctor.model";
import { initPatientModel } from "./Patient.model";

export let sequelize : Sequelize;

const models = [initProfileModel, initDoctorModel, initPatientModel, initAppointmentModel];

export const initSequelize = (db_name:string, db_username:string, db_password:string,db_hostname:string) =>{
    sequelize = new Sequelize (db_name,db_username,db_password, {
        host: db_hostname,
        dialect: "postgres",
        logging: false
    });
    for (const initModel of models){
        initModel(sequelize);
    }
    sequelize.sync();
};