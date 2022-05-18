import { Sequelize } from "sequelize";

export let sequelize : Sequelize;

export const initSequelize = (db_name:string, db_username:string, db_password:string,db_hostname:string) =>{
    sequelize = new Sequelize (db_name,db_username,db_password, {
        host: db_hostname,
        dialect: "postgres",
        logging: false
    })
};