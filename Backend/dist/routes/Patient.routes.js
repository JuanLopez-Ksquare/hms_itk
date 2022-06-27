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
exports.PatientRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
const patient_services_1 = require("../services/patient.services");
exports.PatientRouter = (0, express_1.Router)();
//Creating a patient
exports.PatientRouter.post("/create/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { age, gender, medicalHistory, ProfileId } = req.body;
    const patient = yield (0, patient_services_1.createPatient)(age, gender, medicalHistory, ProfileId);
    res.status(201).send(patient);
}));
//Route to access the create appointment method, we need to be an admin or be the user logged in to the app
exports.PatientRouter.post("/createAppointment/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, hour, motive, PatientId, DoctorId } = req.body;
    const appointment = yield (0, appointment_service_1.createAppointment)(date, hour, motive, "Pending", PatientId, DoctorId);
    res.status(201).send(appointment);
}));
//Route that can be used to access all of the appointments of a patient, can only be accessed by an admin or by the usesr themself and you can paginate from here if you want sending query params of limit and offset
//Limit and offset have defaults values in the case the user does not send a default value
exports.PatientRouter.get("/listAppointments/:patientId/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: [""], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    let { limit, offset } = req.query;
    if (!limit) {
        limit = "10";
    }
    if (!offset) {
        offset = "0";
    }
    const listAppointments = yield (0, appointment_service_1.readAllPatientAppointments)(+patientId, +limit, +offset);
    res.status(201).send(listAppointments);
}));
//This route it is used to get ONE specific appointment from a patient, can only be accessed by the user themself
exports.PatientRouter.get("/readAppointment/:patientId/:appointmentId/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: [""], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId, appointmentId } = req.params;
    const listAppointments = yield (0, appointment_service_1.readPatientAppointment)(+patientId, +appointmentId);
    res.status(201).send(listAppointments);
}));
exports.PatientRouter.delete("/cancelAppointment/:appointmentId/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: [""], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = req.params;
    const listAppointments = yield (0, appointment_service_1.cancelPatientAppointment)(+appointmentId, "canceled");
    res.status(201).send(listAppointments);
}));
exports.PatientRouter.get("/patient/:profileId/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId } = req.params;
    const patient = yield (0, patient_services_1.getOnePatient)(+profileId);
    res.status(201).send(patient);
}));
exports.PatientRouter.get("/appointments/all/:id/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getAllAppointments = yield (0, appointment_service_1.readAllDataPatientAppointments)(+id);
        res.status(200).send(getAllAppointments);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.PatientRouter.get("/appointments/all/history/:id/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getAllAppointments = yield (0, appointment_service_1.readAllDataPatientAppointments)(+id);
        res.status(200).send(getAllAppointments);
    }
    catch (error) {
        res.send(error);
    }
}));
