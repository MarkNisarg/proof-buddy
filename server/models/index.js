import Sequelize from 'sequelize';
import { DB_CONFIG } from '../config/db.config.js';
import userModel from './user.model.js';

const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
  host: DB_CONFIG.HOST,
  dialect: DB_CONFIG.DIALECT
});

const db = {
  sequelize,
  Sequelize,
  user: userModel(sequelize, Sequelize)
};

export default db;
