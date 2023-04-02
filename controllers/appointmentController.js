const db = require("../models");
const { Op } = require("sequelize");
const redis_server = require("../redis_server");
var sem = require("semaphore")(1);

const Appointment = db.appointment;
const Doctor = db.doctor;

const createAppointment = (req, res) => {
  if (!/^\d+$/.test(req.body.patientID)) {
    return res.status(400).json({ message: "Please input integer" });
  }
  sem.take(async function () {
    const data = {
      time: req.body.time,
      date: req.body.date,
      doctorID: req.body.doctorID,
      patientID: req.body.patientID,
    };

    if (await appointmentExist(data)) {
      sem.leave();
      return res
        .status(400)
        .json({ message: "You have another appointment at this date" });
    }

    if (await saveAppointment(data)) {
      sem.leave();
      return res.status(200).json({ message: "Appointment created" });
    }

    sem.leave();
    return res
      .status(400)
      .json({ message: "Doctor capacity is full at this date" });
  });
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

const saveAppointment = async (userRequest) => {
  const redisServer = new redis_server();
  let doctorCapacity;

  const doctorCapacityCache = await redisServer.getData(
    "doc_cap_" + userRequest.doctorID
  );
  console.log(
    "cache get doc_cap_" + userRequest.doctorID,
    "=>",
    doctorCapacityCache
  );

  if (doctorCapacityCache) {
    doctorCapacity = doctorCapacityCache;
  } else {
    result = await Doctor.findOne({
      where: { doctorID: userRequest.doctorID },
    });
    doctorCapacity = result.capacity;
    redisServer.setData("doc_cap_" + userRequest.doctorID, doctorCapacity);
    console.log(
      "cache set doc_cap_" + userRequest.doctorID,
      "=>",
      doctorCapacity
    );
  }

  let freeCapacity;
  freeCapacity = await redisServer.getData(
    "doc_freeCap_" + userRequest.date + "_" + userRequest.doctorID
  );

  console.log(
    "cache get doc_freeCap_" + userRequest.date + "_" + userRequest.doctorID,
    "=>",
    freeCapacity
  );

  if (!freeCapacity) {
    let appointmentCount = await Appointment.count({
      where: {
        [Op.and]: [
          { doctorID: userRequest.doctorID },
          { date: userRequest.date },
        ],
      },
    });
    freeCapacity = doctorCapacity - appointmentCount;
    redisServer.setData(
      "doc_freeCap_" + userRequest.date + "_" + userRequest.doctorID,
      freeCapacity
    );

    console.log(
      "cache set doc_freeCap_" + userRequest.date + "_" + userRequest.doctorID,
      "=>",
      freeCapacity
    );
  }

  if (freeCapacity > 0) {
    freeCapacity -= 1;
    const appointment = await Appointment.create(userRequest);
    redisServer.setData(
      "doc_freeCap_" + userRequest.date + "_" + userRequest.doctorID,
      freeCapacity
    );

    console.log(
      "cache update doc_freeCap_" +
        userRequest.date +
        "_" +
        userRequest.doctorID,
      "=>",
      freeCapacity
    );

    return true;
  } else {
    //ToDo: return error message no freeCapacity

    return false;
  }
};

module.exports = { createAppointment, appointmentExist };
