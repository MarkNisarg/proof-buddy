import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    last_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    is_student: {
      type: DataTypes.BOOLEAN,
    },
    is_instructor: {
      type: DataTypes.BOOLEAN,
    },
    is_superuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    date_joined: {
      type: DataTypes.DATE,
    },
  });

  return User;
};
