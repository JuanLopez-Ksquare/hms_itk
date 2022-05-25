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
exports.createAppointment = void 0;
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
