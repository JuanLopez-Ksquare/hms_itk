import { Sequelize } from "sequelize";
import { initProfileModel } from "../models/Profile.model";

export let sequelize : Sequelize;

const models = [initProfileModel];

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