const db = require("../models");
const specialities = require("../models/specialitiesModel");
const sequelize = require("sequelize");

// model
const Doctor = db.doctor;

const createDoctor = async (req, res) => {
  const data = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    capacity: req.body.capacity,
    specialitySpecialitiesID: req.body.specialitiesID,
  };
  const doctor = await Doctor.create(data);
  res.status(200).send(doctor);
};

const getDoctor = async (req, res) => {
  const result = await Doctor.findAll();
  res.status(200).send(result);
};
// sequelize
//   .sync()
//   .then(() => {
//     Doctor.findAll()
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.error("Failed to retrieve data : ", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

module.exports = { createDoctor, getDoctor };
