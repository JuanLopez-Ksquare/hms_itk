"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const Profile_model_1 = require("./Profile.model");
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
const initPatientModel = (sequelize) => {
    Patient.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        age: sequelize_1.DataTypes.INTEGER,
        gender: sequelize_1.DataTypes.STRING,
        medicalHistory: sequelize_1.DataTypes.STRING
    }, {
        sequelize
    });
    Patient.belongsTo(Profile_model_1.Profile, { targetKey: "id" });
};
exports.initPatientModel = initPatientModel;
