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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
const doctor_services_1 = require("../services/doctor.services");
exports.DoctorRouter = (0, express_1.Router)();
//Creates a doctor 
exports.DoctorRouter.post("/create/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { especialization, profesionalLicence, ProfileId } = req.body;
    const doctor = yield (0, doctor_services_1.createDoctor)(especialization, profesionalLicence, ProfileId);
    res.status(201).send(doctor);
}));
//List all of appointments from an specific doctor you NEED to provide a doctor id and you may provide the date or patientid to filter by them, you can add ASC or DESC as a param too
exports.DoctorRouter.get("/listAppointments/:order?", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: [""], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { order } = req.params;
    const { DoctorId, date, PatientId } = JSON.parse(req.query.where || "{}");
    const where = { DoctorId, date, PatientId };
    if (!where.DoctorId) {
        res.send("Need doctor id");
    }
    if (!where.date) {
        delete where.date;
    }
    if (!where.PatientId) {
        delete where.PatientId;
    }
    if (!order) {
        order = "ASC";
    }
    if (order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
        order = "ASC";
    }
    const listAppointments = yield (0, appointment_service_1.readAllDoctorAppointments)(where, order);
    res.status(201).send(listAppointments);
}));
//Change hour or date from an appointment
exports.DoctorRouter.patch("/updateAppointment/:appointmentId/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: [""], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = req.params;
    let { date, hour } = req.body;
    const originalAppointment = yield (0, appointment_service_1.getAppointment)(+appointmentId);
    if (!date) {
        date = originalAppointment.date;
    }
    if (!hour) {
        hour = originalAppointment.hour;
    }
    const appointment = yield (0, appointment_service_1.udpateDateAppointment)(+appointmentId, date, hour);
    res.status(201).send(yield (0, appointment_service_1.getAppointment)(+appointmentId));
}));
exports.DoctorRouter.get("/doctor/:profileId/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId } = req.params;
    const doctor = yield (0, doctor_services_1.getOneDoctor)(+profileId);
    res.status(201).send(doctor);
}));
exports.DoctorRouter.get("/appointments/all/:id/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doctor = yield (0, appointment_service_1.readAllDataDoctorAppointments)(+id);
    res.status(201).send(doctor);
}));
