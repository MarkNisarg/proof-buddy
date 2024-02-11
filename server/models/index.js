import Sequelize from 'sequelize';
import { DB_CONFIG } from '../config/db.config.js';
import userModel from './user.model.js';

/**
 * Initialize Sequelize connection using the imported configuration.
 */
const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
  host: DB_CONFIG.HOST,
  dialect: DB_CONFIG.DIALECT,
  logging: false
});

/**
 * The db object will hold all models and the Sequelize instance itself.
 */
const db = {
  sequelize,
  Sequelize,
  user: userModel(sequelize, Sequelize)
};

export default db;
