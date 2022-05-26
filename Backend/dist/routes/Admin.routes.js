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
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.get("/appointments", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limit, offset } = req.query;
    if (!limit) {
        limit = "10";
    }
    if (!offset) {
        offset = "0";
    }
    const appointments = yield (0, appointment_service_1.getAllAppointments)(+limit, +offset);
    res.status(201).send(appointments);
}));
//This route can filter usting the patient,doctor and status of the appointment via query params, you can send any of the 3 params in whatever combination you want
exports.AdminRouter.get("/searchAppointments/:order?", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PatientId, DoctorId, status } = JSON.parse(req.query.where || "{}");
        let { order } = req.params;
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
        if (!order) {
            order = "ASC";
        }
        if (order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
            order = "ASC";
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
