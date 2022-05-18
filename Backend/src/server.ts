import express, {Request, Response} from "express";
import dotenv from "dotenv";
import {initSequelize} from "./models/index"

dotenv.config();

const app = express();

const port = process.env.PORT;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_hostname = <string>process.env.DB_HOSTNAME;

//Middleware
app.use(express.json());


app.listen(port, () =>{
    try {
        initSequelize(db_name,db_username,db_password,db_hostname);
        console.log("Up and running on " + port);
    } catch (error) {
        console.error(error);
        process.abort();
    }
})
