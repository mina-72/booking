const db = require("../models");
// const doctor = require("../models/doctorModel");
// const patient = require("../models/patientModel");
const Appointment = db.appointment;

const createAppointment = async (req, res) => {
  const data = {
    timedate: req.body.timedate,
    doctorDoctorID: req.body.doctorID,
    patientPatientID: req.body.patientID,
  };
  const appointment = await Appointment.create(data);
  res.status(200).send(appointment);
};

module.exports = { createAppointment };

// exports.addAppointment = (patientId, doctorId) => {
//   return Patient.findByPk(patientId)
//     .then((patient) => {
//       if (!patient) {
//         console.log("Patient not found!");
//         return null;
//       }
//       return Doctor.findByPk(doctorId).then((doctor) => {
//         if (!doctor) {
//           console.log("Doctor not found!");
//           return null;
//         }

//         patient.addAppointment(doctor);
//         console.log(
//           `>> added Doctor id=${doctor.id} to Patient id=${patient.id}`
//         );
//         return patient;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding Doctor to Patient: ", err);
//     });
// };
