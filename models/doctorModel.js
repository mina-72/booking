// const specialitiesModel = require("./specialitiesModel");
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define("doctor", {
    doctorID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Doctor;
};
