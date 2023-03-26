const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "https://localhost:3000",
};

//middlewares
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const doctorRoute = require("./routes/doctorRoute");
const specialitiesRoute = require("./routes/specialitiesRoute");
const patientRoute = require("./routes/patientRoute");
const appointmentRoute = require("./routes/appointmentRoute");

app.use("/api/doctor", doctorRoute);
app.use("/api/specialities", specialitiesRoute);
app.use("/api/patient", patientRoute);
app.use("/api/appointment", appointmentRoute);

//TESTING routes
app.get("/", (req, res) => {
  res.send({ message: "heelo" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
