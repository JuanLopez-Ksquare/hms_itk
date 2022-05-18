"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./models/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_hostname = process.env.DB_HOSTNAME;
//Middleware
app.use(express_1.default.json());
app.listen(port, () => {
    try {
        (0, index_1.initSequelize)(db_name, db_username, db_password, db_hostname);
        console.log("Up and running on " + port);
    }
    catch (error) {
        console.error(error);
        process.abort();
    }
});
