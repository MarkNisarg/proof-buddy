import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';
import userModel from './user.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
});

const db = {
  sequelize,
  Sequelize,
  user: userModel(sequelize, Sequelize)
};

export default db;
