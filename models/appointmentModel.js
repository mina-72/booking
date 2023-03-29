// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointment", {
    appointmentID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  });

  return Appointment;
};
