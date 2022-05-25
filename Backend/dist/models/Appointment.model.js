"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentModel = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const Patient_model_1 = require("./Patient.model");
const Doctor_model_1 = require("./Doctor.model");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
const initAppointmentModel = (sequelize) => {
    Appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: sequelize_1.DataTypes.DATEONLY,
        hour: sequelize_1.DataTypes.STRING,
        motive: sequelize_1.DataTypes.STRING,
        status: sequelize_1.DataTypes.STRING
    }, {
        sequelize
    });
    Appointment.belongsTo(Patient_model_1.Patient);
    Appointment.belongsTo(Doctor_model_1.Doctor);
};
exports.initAppointmentModel = initAppointmentModel;
