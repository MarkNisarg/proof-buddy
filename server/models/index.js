import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';
import userModel from './user.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT
});

const db = {
  sequelize,
  Sequelize,
  user: userModel(sequelize, Sequelize)
};

// Test database connection.
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
