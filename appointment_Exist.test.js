const appointmentController = require("./controllers/appointmentController");
// const db = require("./models");
// const Appointment = db.appointment;

// jest.mock("Appointment");

it("show appointment that exist", async () => {
  // Appointment.findAndCountAll.mockResolvedValue({
  //   count: 1,
  // });

  let userRequest = {
    date: "2023-01-01",
    time: "05:00:00",
    doctorID: 1,
    patientID: 1,
  };

  const result = await appointmentController.appointmentExist(userRequest);
  expect(result).toEqual(true);
});

it("show appointment that Not exist", async () => {
  // Appointment.findAndCountAll.mockResolvedValue({
  //   count: 1,
  // });

  let userRequest = {
    date: "2023-01-01",
    time: "05:00:00",
    doctorID: 1,
    patientID: 2,
  };

  const result = await appointmentController.appointmentExist(userRequest);
  expect(result).toEqual(false);
});
