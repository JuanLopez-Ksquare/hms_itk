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
exports.getAllAppointments = exports.udpateDateAppointment = exports.readAllDoctorAppointments = exports.cancelPatientAppointment = exports.readPatientAppointment = exports.readAllPatientAppointments = exports.getAppointment = exports.createAppointment = void 0;
const Appointment_model_1 = require("../models/Appointment.model");
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
const readAllPatientAppointments = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({ where: {
                PatientId: patientId
            } });
        return listAppointment;
    }
    catch (error) {
        return error;
    }
});
exports.readAllPatientAppointments = readAllPatientAppointments;
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
const readAllDoctorAppointments = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAppointment = yield Appointment_model_1.Appointment.findAll({ where: {
                DoctorId: doctorId
            } });
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
///////////////////////////////////////////////// ADMIN APPOINTMENTS ////////////////////////////////
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield Appointment_model_1.Appointment.findAll({ order: ["id"] });
        return appointments;
    }
    catch (error) {
        return error;
    }
});
exports.getAllAppointments = getAllAppointments;
