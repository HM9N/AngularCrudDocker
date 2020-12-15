const express = require("express");
const app = express();
const studentRoutes = express.Router();
// Require Student model in our routes module
let Student = require("../models/Student");
// Defined store route
studentRoutes.route("/add").post(function (req, res) {
  let student = new Student(req.body);
  student
    .save()
    .then((student) => {
      res.status(200).json({ student: "student in added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
// Defined get data(index or listing) route
studentRoutes.route("/").get(function (req, res) {
  Student.find(function (err, studentes) {
    if (err) {
      console.log(err);
    } else {
      res.json(studentes);
    }
  });
});
// Defined edit route
studentRoutes.route("/edit/:id").get(function (req, res) {
  let id = req.params.id;
  Student.findById(id, function (err, student) {
    res.json(student);
  });
});
// Defined update route
studentRoutes.route("/update/:id").post(function (req, res) {
  Student.findById(req.params.id, function (err, next, student) {
    if (!student) return next(new Error("Could not load Document"));
    else {
      student.name = req.body.name;
      student.lastName = req.body.lastName;
      student.nit = req.body.nit;
      student.age = req.body.age;
      student.career = req.body.career;
      student
        .save()
        .then((student) => {
          res.status(200).send(`El estudiante con NIT ${student.nit} ha sido modificado`);
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
// Defined delete | remove | destroy route
studentRoutes.route("/delete/:id").get(function (req, res) {
  Student.findByIdAndRemove({ _id: req.params.id }, function (err, student) {
    if (err) res.json(err);
    else res.json("El estudiante ha sido eliminado correctamente");
  });
});
module.exports = studentRoutes;