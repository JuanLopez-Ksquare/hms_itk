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
exports.UserRouter = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post("/createPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Missing fields" });
    }
    /*   if (role === "admin" || role === "doctor") {
        return res.status(400).send({ error: "Invalid role" });
      } */
    try {
        const userId = yield (0, methods_1.createUserPatient)(email, password, "patient", false);
        res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
// createDoctor - Authenticado y el rol debe ser admin
exports.UserRouter.post("/createDoctor", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Missing fields" });
    }
    try {
        const userId = yield (0, methods_1.createUserDoctor)(email, password, "doctor", false);
        res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
//In this method we can create users via the super user, not even admin can use this method
exports.UserRouter.post("/createAdmin", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({ roles: [""], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Missing fields" });
    }
    try {
        const userId = yield (0, methods_1.createUserDoctor)(email, password, "admin", false);
        res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.UserRouter.get("/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, methods_1.readUser)(userId);
        return res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "fede went wrong" });
    }
}));
exports.UserRouter.get("/", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, methods_1.getAllUsers)();
        res.status(200).send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "something went wrong" });
    }
}));
/* UserRouter.patch(
  "/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { displayName } = req.body;

    if (!displayName) {
      return res.status(400).send({
        error: "no fields to update",
      });
    }

    try {
      const user = await updateUser(userId, displayName);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
); */
exports.UserRouter.delete("/disable/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, methods_1.disableUser)(userId, true);
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRouter.patch("/enable/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, methods_1.disableUser)(userId, false);
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
