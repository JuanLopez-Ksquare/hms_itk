import {Model, InferAttributes, InferCreationAttributes, CreationOptional,DataTypes, Sequelize} from "sequelize";
import { Profile } from "./Profile.model";

export class Doctor extends Model<InferAttributes<Doctor>,InferCreationAttributes<Doctor>>
{
    declare id: CreationOptional<number>;
    declare especialization : string;
    declare profesionalLicence : String;
    ProfileId? : number;
    
}

export const initDoctorModel = (sequelize: Sequelize) => {
    Doctor.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            especialization : DataTypes.STRING,
            profesionalLicence : DataTypes.STRING
        },
        {
            sequelize
        }
    );
    Doctor.belongsTo(Profile, {targetKey: "id"});
};