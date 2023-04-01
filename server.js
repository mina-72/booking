const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const doctorRoute = require("./routes/doctorRoute");
const specialitiesRoute = require("./routes/specialitiesRoute");
const patientRoute = require("./routes/patientRoute");
const appointmentRoute = require("./routes/appointmentRoute");

app.use("/api/doctor", doctorRoute);
app.use("/api/specialities", specialitiesRoute);
app.use("/api/patient", patientRoute);
app.use("/api/appointment", appointmentRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
