const db = require("../models");

// model
const Patient = db.patient;

const createPatient = async (req, res) => {
  const data = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  };

  const patient = await Patient.create(data);
  res.status(200).send(patient);
};

module.exports = { createPatient };
