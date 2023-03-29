const db = require("../models");
const { Op } = require("sequelize");
const redis_server = require("../redis_server");

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

  if (result.count == 0) {
    return false;
  } else {
    return true;
  }
};

const doctorIsFull = async (userRequest) => {
  const redisServer = new redis_server();
  let doctorCapacity;

  const doctorCapacityCache = await redisServer.getData(
    "doc_" + userRequest.doctorID
  );
  console.log("get doc_" + userRequest.doctorID, "=>", doctorCapacityCache);

  if (doctorCapacityCache) {
    doctorCapacity = doctorCapacityCache;
  } else {
    result = await Doctor.findOne({
      where: { doctorID: userRequest.doctorID },
    });
    doctorCapacity = result.capacity;
    redisServer.setData("doc_" + userRequest.doctorID, doctorCapacity);
    console.log("set doc_" + userRequest.doctorID, "=>", doctorCapacity);
  }

  const assignedAppointment = await Appointment.count({
    where: {
      [Op.and]: [
        { doctorID: userRequest.doctorID },
        { date: userRequest.date },
      ],
    },
  });
  console.log("assignedAppointment: ", assignedAppointment);

  if (doctorCapacity > assignedAppointment) {
    return false;
  } else {
    return true;
  }
};

module.exports = { createAppointment };
