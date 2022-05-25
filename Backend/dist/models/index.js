"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Profile_model_1 = require("../models/Profile.model");
const models = [Profile_model_1.initProfileModel];
const initSequelize = (db_name, db_username, db_password, db_hostname) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        host: db_hostname,
        dialect: "postgres",
        logging: false
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    exports.sequelize.sync();
};
exports.initSequelize = initSequelize;
