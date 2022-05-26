"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Profile_model_1 = require("../models/Profile.model");
const Appointment_model_1 = require("./Appointment.model");
const Doctor_model_1 = require("./Doctor.model");
const Patient_model_1 = require("./Patient.model");
const models = [Profile_model_1.initProfileModel, Doctor_model_1.initDoctorModel, Patient_model_1.initPatientModel, Appointment_model_1.initAppointmentModel];
const initSequelize = (db_name, db_username, db_password, db_hostname) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        host: db_hostname,
        dialect: "postgres",
        logging: false
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    exports.sequelize.sync();
};
exports.initSequelize = initSequelize;
