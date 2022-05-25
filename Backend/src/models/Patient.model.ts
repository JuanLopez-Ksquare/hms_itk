import {Model, InferAttributes, InferCreationAttributes, CreationOptional,DataTypes, Sequelize} from "sequelize";
import { Profile } from "./Profile.model";

export class Patient extends Model<InferAttributes<Patient>,InferCreationAttributes<Patient>>
{
    declare id: CreationOptional<number>;
    declare age : number;
    declare gender : string;
    declare medicalHistory : number;
    ProfileId? : number;
    
}

export const initPatientModel = (sequelize: Sequelize) => {
    Patient.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            age : DataTypes.INTEGER,
            gender : DataTypes.STRING,
            medicalHistory : DataTypes.INTEGER
        },
        {
            sequelize
        }
    );
    Patient.belongsTo(Profile, {targetKey: "id"});
};