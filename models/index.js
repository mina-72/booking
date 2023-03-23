const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//One To Many: Doctor and Special
db.doctor = require("./doctorModel.js")(sequelize, Sequelize);
db.specialities = require("./specialitiesModel.js")(sequelize, Sequelize);

db.specialities.hasMany(db.doctor);
db.doctor.belongsTo(db.specialities);

//Many TO Manty: Doctor and Patient and Appointments
db.appointments = require("./appointmentModel.js")(sequelize, Sequelize);
db.patient = require("./patientModel.js")(sequelize, Sequelize);

db.doctor.belongsToMany(db.patient, {
  through: db.appointments,
  foreignKey: "doctorID",
  otherKey: "patientID",
});
db.patient.belongsToMany(db.doctor, {
  through: db.appointments,
  foreignKey: "patientID",
  otherKey: "doctorID",
});

db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("re-sync done!");
});

module.exports = db;
