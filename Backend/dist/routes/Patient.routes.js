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
exports.PatientRouter.post("/createPatient", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { age, gender, medicalHistory, ProfileId } = req.body;
    const patient = yield (0, patient_services_1.createPatient)(age, gender, medicalHistory, ProfileId);
    res.status(201).send(patient);
}));
//Route to access the create appointment method, we need to be an admin or be the user logged in to the app
exports.PatientRouter.post("/createAppointment", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin", "patient"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, hour, motive, PatientId, DoctorId } = req.body;
    const appointment = yield (0, appointment_service_1.createAppointment)(date, hour, motive, PatientId, DoctorId);
    res.status(201).send(appointment);
}));
