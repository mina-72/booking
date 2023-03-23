// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointment", {
    appointmentID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timedate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Appointment;
};
