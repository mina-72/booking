const db = require("../models");

// create main Model
const Specialities = db.specialities;
const Doctor = db.doctor;

// main work

// 1. create product

const addSpeciality = async (req, res) => {
  let info = {
    name: req.body.name,
  };

  const specialities = await Specialities.create(info);
  res.status(200).send(specialities);
  console.log(specialities);
};

module.exports = { addSpeciality };
