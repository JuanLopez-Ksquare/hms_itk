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
exports.AdminRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
const Appointment_model_1 = require("../models/Appointment.model");
const patient_services_1 = require("../services/patient.services");
const doctor_services_1 = require("../services/doctor.services");
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.get("/appointments", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = "10", offset = "0" } = req.query;
    //Cambiar los + a parse ints
    try {
        const appointments = yield (0, appointment_service_1.getAllAppointments)(+limit, +offset);
        res.status(201).send(appointments);
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
}));
//This route can filter usting the patient,doctor and status of the appointment via query params, you can send any of the 3 params in whatever combination you want
exports.AdminRouter.get("/searchAppointments/:order?", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PatientId, DoctorId, status } = JSON.parse(req.query.where || "{}");
        let { order = "ASC" } = req.params;
        const where = { PatientId, DoctorId, status };
        //This should be a foreach however i do not know how to use types so instead i need an if for every query param
        if (!where.PatientId) {
            delete where.PatientId;
        }
        if (!where.DoctorId) {
            delete where.DoctorId;
        }
        if (!where.status) {
            delete where.status;
        }
        const toSearch = yield Appointment_model_1.Appointment.findAll({
            where,
            order: [["id", order]]
        });
        res.status(200).send(toSearch);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.AdminRouter.get("/patients", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield (0, patient_services_1.getAllPatients)();
        res.status(200).send(list);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.AdminRouter.get("/doctors", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin", "patient"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield (0, doctor_services_1.getAllDoctors)();
        res.status(200).send(list);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.AdminRouter.get("/appointments/all/", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllAppointments = yield (0, appointment_service_1.readAllDataAdminAppointments)();
        res.status(200).send(getAllAppointments);
    }
    catch (error) {
        res.send(error);
    }
}));
