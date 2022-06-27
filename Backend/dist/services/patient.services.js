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
exports.getOnePatient = exports.getAllPatients = exports.createPatient = void 0;
const Patient_model_1 = require("../models/Patient.model");
const Profile_model_1 = require("../models/Profile.model");
//With this we create a patient on our local database
const createPatient = (age, gender, medicalHistory, ProfileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patient_model_1.Patient.create({
            age,
            gender,
            medicalHistory,
            ProfileId
        });
        return patient;
    }
    catch (error) {
        return error;
    }
});
exports.createPatient = createPatient;
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPatients = yield Patient_model_1.Patient.findAll({
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }]
        });
        return listPatients;
    }
    catch (error) {
        return error;
    }
});
exports.getAllPatients = getAllPatients;
const getOnePatient = (profileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patient_model_1.Patient.findOne({ where: {
                ProfileId: profileId
            },
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }] });
        return patient;
    }
    catch (error) {
        return error;
    }
});
exports.getOnePatient = getOnePatient;
