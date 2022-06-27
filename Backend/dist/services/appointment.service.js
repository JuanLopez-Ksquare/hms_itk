"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllDataAdminAppointments = exports.getAllAppointments = exports.readAllDataDoctorAppointments = exports.udpateDateAppointment = exports.readAllDoctorAppointments = exports.cancelPatientAppointment = exports.readPatientAppointment = exports.readAllDataPatientAppointments = exports.readAllPatientAppointments = exports.getAppointment = exports.createAppointment = void 0;
const Appointment_model_1 = require("../models/Appointment.model");
const Doctor_model_1 = require("../models/Doctor.model");
const Patient_model_1 = require("../models/Patient.model");
const Profile_model_1 = require("../models/Profile.model");
const createAppointment = (date, hour, motive, status, PatientId, DoctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield Appointment_model_1.Appointment.create({
            date,
            hour,
            motive,
            status,
            PatientId,
            DoctorId
        });
        return appointment;
    }
    catch (error) {
        return error;
    }
});
exports.createAppointment = createAppointment;
const getAppointment = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield Appointment_model_1.Appointment.findByPk(appointmentId);
        return appointment;
    }
    catch (error) {
        return error;
    }
});
exports.getAppointment = getAppointment;
//////////////////////////////////////////////////   USER APPOINTMENTS //////////////////////////////////////////////////////////////
//The user can read all of his appointments
const readAllPatientAppointments = (patientId, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({ where: {
                PatientId: patientId
            },
            limit: limit,
            offset: offset
        });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readAllPatientAppointments = readAllPatientAppointments;
//DOUBLE JOIN 
const readAllDataPatientAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({ where: {
                PatientId: id,
            },
            include: [{
                    model: Patient_model_1.Patient,
                    required: true,
                    include: [
                        Profile_model_1.Profile
                    ]
                }, {
                    model: Doctor_model_1.Doctor,
                    required: true,
                    include: [
                        Profile_model_1.Profile
                    ]
                }]
        });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readAllDataPatientAppointments = readAllDataPatientAppointments;
//The user can read an specific appointment, you need to give the user id and then the appointment id
const readPatientAppointment = (patientId, appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findOne({ where: {
                PatientId: patientId,
                id: appointmentId
            } });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readPatientAppointment = readPatientAppointment;
const cancelPatientAppointment = (appointmentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield Appointment_model_1.Appointment.update({
            status: status
        }, {
            where: { id: appointmentId }
        });
        return appointment;
    }
    catch (error) {
        return error;
    }
});
exports.cancelPatientAppointment = cancelPatientAppointment;
////////////////////////////////////////////////// DOCTOR APPOINTMENTS //////////////////////////////////////////
//Read all appointsment from a specific doctor
const readAllDoctorAppointments = (where, order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({
            where,
            order: [["id", order]]
        });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readAllDoctorAppointments = readAllDoctorAppointments;
const udpateDateAppointment = (appointmentId, date, hour) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield Appointment_model_1.Appointment.update({
            date: date,
            hour: hour
        }, {
            where: { id: appointmentId }
        });
        return appointment;
    }
    catch (error) {
    }
});
exports.udpateDateAppointment = udpateDateAppointment;
const readAllDataDoctorAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({ where: {
                DoctorId: id
            },
            include: [{
                    model: Patient_model_1.Patient,
                    required: true,
                    include: [
                        Profile_model_1.Profile
                    ]
                }, {
                    model: Doctor_model_1.Doctor,
                    required: true,
                    include: [
                        Profile_model_1.Profile
                    ]
                }]
        });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readAllDataDoctorAppointments = readAllDataDoctorAppointments;
///////////////////////////////////////////////// ADMIN APPOINTMENTS ////////////////////////////////
const getAllAppointments = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield Appointment_model_1.Appointment.findAll({
        order: ["id"],
        limit: limit,
        offset: offset
    });
    return appointments;
});
exports.getAllAppointments = getAllAppointments;
const readAllDataAdminAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({ where: {},
            include: [{
                    model: Patient_model_1.Patient,
                    required: true,
                    include: [
                        Profile_model_1.Profile
                    ]
                }, {
                    model: Doctor_model_1.Doctor,
                    required: true,
                    include: [
                        Profile_model_1.Profile
                    ]
                }]
        });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readAllDataAdminAppointments = readAllDataAdminAppointments;
