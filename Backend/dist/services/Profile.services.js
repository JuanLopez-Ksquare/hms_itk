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
exports.createProfile = void 0;
const Profile_model_1 = require("../models/Profile.model");
//With this function you can create a generic profile for any user since the roles does not matter at this point
const createProfile = (name, lastName, phoneNumber, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdProfile = yield Profile_model_1.Profile.create({
            name,
            lastName,
            phoneNumber,
            userId
        });
        return createdProfile;
    }
    catch (error) {
        return error;
    }
});
exports.createProfile = createProfile;
