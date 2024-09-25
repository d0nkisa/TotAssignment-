import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class Reservation extends Model {}

Reservation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  table_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservation_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { sequelize, modelName: 'Reservation' });

Reservation.belongsTo(User, { foreignKey: 'user_id' });

export default Reservation;
