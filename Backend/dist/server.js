"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./models/index");
const Users_routes_1 = require("./routes/Users.routes");
const Profile_routes_1 = require("./routes/Profile.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
admin.initializeApp();
const port = process.env.PORT;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_hostname = process.env.DB_HOSTNAME;
//Middleware
app.use(express_1.default.json());
//Routes
app.use("/users", Users_routes_1.UserRouter);
app.use("/profile", Profile_routes_1.ProfileRouter);
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
