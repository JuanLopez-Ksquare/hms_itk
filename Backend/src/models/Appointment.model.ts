import {Model, InferAttributes, InferCreationAttributes, CreationOptional,DataTypes, Sequelize} from "sequelize";
import { Patient } from "./Patient.model";
import { Doctor } from "./Doctor.model";

export class Appointment extends Model<InferAttributes<Appointment>,InferCreationAttributes<Appointment>>
{
    declare id: CreationOptional<number>;
    declare date : Date;
    declare hour : string;
    declare motive : String;
    declare status : string;
    PatientId? : number;
    DoctorId? :number;
    
}

export const initAppointmentModel = (sequelize: Sequelize) => {
    Appointment.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            date : DataTypes.DATEONLY,
            hour : DataTypes.STRING,
            motive : DataTypes.STRING,
            status : DataTypes.STRING
        },
        {
            sequelize
        }
    );
    Appointment.belongsTo(Patient);
    Appointment.belongsTo(Doctor);
};