import { Sequelize } from 'sequelize';
import config from './config';
import dotenv from 'dotenv';

dotenv.config();

const env = 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password as string,
  {
    host: dbConfig.host,
    port: Number(dbConfig.port),
    dialect: dbConfig.dialect,
    logging: false
  }
);

export default sequelize;
