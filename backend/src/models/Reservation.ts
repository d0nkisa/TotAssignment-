import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class Reservation extends Model {
  public id!: number;
  public user_id!: number;
  public table_number!: number;
  public reservation_time!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservation_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
  }
);

Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Reservation, { foreignKey: 'user_id', as: 'reservations' });

export default Reservation;
