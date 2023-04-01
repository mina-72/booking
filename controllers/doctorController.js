const db = require("../models");
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

//get all doctors
async function getAllDoctors(req, res) {
  const doctors = await Doctor.findAll();

  res.status(200).json(doctors);
}

module.exports = { createDoctor, getAllDoctors };
