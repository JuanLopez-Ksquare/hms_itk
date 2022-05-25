import {Model, InferAttributes, InferCreationAttributes, CreationOptional,DataTypes, Sequelize} from "sequelize";

export class Profile extends Model<InferAttributes<Profile>,InferCreationAttributes<Profile>>
{
    declare id: CreationOptional<number>;
    declare name : string;
    declare lastName : string;
    declare phoneNumber : string;
    declare userId : string;
    
}

export const initProfileModel = (sequelize: Sequelize) => {
    Profile.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: DataTypes.STRING,
            lastName: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            userId : {type: DataTypes.STRING, unique:true}
        },
        {
            sequelize
        }
    )
};