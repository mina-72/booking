const express = require("express");
const faker = require("./node_modules/Faker");
const _ = require("lodash");
const date = require("Faker/lib/date");
const { time } = require("console");
const app = express();
app.get("/address", (req, res) => {
  const count = req.query.count;
  if (!count) {
    return res
      .status(400)
      .send({ errorMsg: "count query parameter is missing." });
  }
  res.send(
    _.times(count, () => {
      return {
        date: randomDate(new Date(), new Date(2023, 04, 30)),
        time: randomTime(new Date(), new Date(2023, 04, 30)),
        doctorID: faker.random.array_element([1, 2]),
        patientID: faker.random.array_element([1, 2, 3, 4]),
      };
    })
  );
});

function randomTime(start, end) {
  var d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    hour = "" + (d.getHours() + 1),
    minute = "" + d.getMinutes(),
    second = d.getSeconds();

  return [hour, minute, second].join(":");
}

function randomDate(start, end) {
  var d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    month = "" + d.getMonth(),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

app.listen(3030, () => {
  console.log("server started on port 3030");
});
