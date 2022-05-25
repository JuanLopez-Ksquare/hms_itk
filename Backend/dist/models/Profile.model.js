"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProfileModel = exports.Profile = void 0;
const sequelize_1 = require("sequelize");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
const initProfileModel = (sequelize) => {
    Profile.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: sequelize_1.DataTypes.STRING,
        lastName: sequelize_1.DataTypes.STRING,
        phoneNumber: sequelize_1.DataTypes.STRING,
        userId: { type: sequelize_1.DataTypes.STRING, unique: true }
    }, {
        sequelize
    });
};
exports.initProfileModel = initProfileModel;
