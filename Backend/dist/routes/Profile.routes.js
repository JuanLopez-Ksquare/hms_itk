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
exports.ProfileRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const profile_services_1 = require("../services/profile.services");
exports.ProfileRouter = (0, express_1.Router)();
//Route to acces the create profile method, we need to be an admin or be the user logged in to the app
exports.ProfileRouter.post("/create/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, phoneNumber, userId } = req.body;
    const profileCreated = yield (0, profile_services_1.createProfile)(name, lastName, phoneNumber, userId);
    res.status(200).send(profileCreated);
}));
exports.ProfileRouter.get("/profile/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const profile = yield (0, profile_services_1.readProfile)(userId);
    res.status(200).send(profile);
}));
