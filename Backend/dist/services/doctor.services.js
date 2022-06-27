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
exports.getOneDoctor = exports.getAllDoctors = exports.createDoctor = void 0;
const Doctor_model_1 = require("../models/Doctor.model");
const Profile_model_1 = require("../models/Profile.model");
const createDoctor = (especialization, profesionalLicence, ProfileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield Doctor_model_1.Doctor.create({
            especialization,
            profesionalLicence,
            ProfileId
        });
        return doctor;
    }
    catch (error) {
        return error;
    }
});
exports.createDoctor = createDoctor;
const getAllDoctors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listDoctors = yield Doctor_model_1.Doctor.findAll({
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }]
        });
        return listDoctors;
    }
    catch (error) {
        return error;
    }
});
exports.getAllDoctors = getAllDoctors;
const getOneDoctor = (profileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield Doctor_model_1.Doctor.findOne({ where: {
                ProfileId: profileId
            },
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }] });
        return doctor;
    }
    catch (error) {
        return error;
    }
});
exports.getOneDoctor = getOneDoctor;
