import { DataTypes } from 'sequelize';

/**
 * Define the attributes for the userModel.
 * Each attribute corresponds to a column in the database table.
 */
const userModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  last_name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  is_student: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_instructor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_superuser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_staff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_login: {
    type: DataTypes.DATE
  },
  date_joined: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}

export default (sequelize) => {
  const User = sequelize.define('user', userModelAttributes, {
    // Additional model options can be defined here.
  });

  return User;
};
