"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const User_1 = __importDefault(require("./User"));
class Reservation extends sequelize_1.Model {
}
Reservation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    table_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reservation_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, { sequelize: db_1.default, modelName: 'Reservation' });
Reservation.belongsTo(User_1.default, { foreignKey: 'user_id' });
exports.default = Reservation;
