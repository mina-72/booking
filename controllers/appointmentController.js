const db = require("../models");
const { Op } = require("sequelize");
// const redis = require("redis");

// const doctor = require("../models/doctorModel");
// const patient = require("../models/patientModel");

// const redisClient = redis.createClient("192.168.20.1", 6379);

const Appointment = db.appointment;
const Doctor = db.doctor;

const createAppointment = async (req, res) => {
  const data = {
    time: req.body.time,
    date: req.body.date,
    doctorID: req.body.doctorID,
    patientID: req.body.patientID,
  };

  if (await appointmentExist(data)) {
    console.log("Appointment already exists");
    return res
      .status(400)
      .json({ message: "you have another appointment at this date" });
  }
  if (await doctorIsFull(data)) {
    console.log("doctor capacity is full");
    return res.status(400).json({ message: "fuuuullllly" });
  }
  const appointment = await Appointment.create(data);
  res.status(200).send(appointment);
};

const appointmentExist = async (userRequest) => {
  const result = await Appointment.findAndCountAll({
    where: {
      [Op.and]: [
        { date: userRequest.date },
        { doctorID: userRequest.doctorID },
        { patientID: userRequest.patientID },
      ],
    },
  });

  console.log("result: ", result);
  if (result.count == 0) {
    return false;
  } else {
    return true;
  }
};

const doctorIsFull = async (userRequest) => {
  const doctorCapacity = await redisClient.get(userRequest.doctorID);
  if (!doctorCapacity) {
    doctorCapacity = await Doctor.findOne({
      where: { doctorID: userRequest.doctorID },
    });
    console.log("inside if: ", doctorCapacity.capacity);
  }

  console.log("doctorCapacity: ", doctorCapacity.capacity);
  // console.log("doctorCapacity type is: ", typeof doctorCapacity.capacity);

  const assignedAppointment = await Appointment.count({
    where: {
      [Op.and]: [
        { doctorID: userRequest.doctorID },
        { date: userRequest.date },
      ],
    },
  });
  console.log("assignedAppointment: ", assignedAppointment);
  // console.log("assignedAppointment type is: ", typeof assignedAppointment);

  if (doctorCapacity.capacity > assignedAppointment) {
    return false;
  } else {
    return true;
  }
};

module.exports = { createAppointment };
