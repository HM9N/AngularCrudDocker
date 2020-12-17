const express = require("express");
const app = express();
const studentRoutes = express.Router();

let Student = require("../models/Student");

// Guardar un estudiante
studentRoutes.route("/add").post((req, res) => {
  let student = new Student(req.body);
  student
    .save()
    .then(() => {
      res.status(200).json({ student: "El estudiante ha sido agregado" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

// obtener todos los estudiantes
studentRoutes.route("/").get((req, res) => {
  Student.find((err, students) => {
    err ? res.status(400).send(err) : res.status(200).send(students);
  });
});
// Defined update route
studentRoutes.route("/update/:id").post((req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (!student) return next(new Error("Could not load Document"));
    else {
      student.name = req.body.name;
      student.lastName = req.body.lastName;
      student.nit = req.body.nit;
      student.age = req.body.age;
      student.note = req.body.note;
      student
        .save()
        .then((student) => {
          res
            .status(200)
            .send(`El estudiante con NIT ${student.nit} ha sido modificado`);
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Modificar varios que cumplan un criterio

studentRoutes.route("/update").post((req, res) => {
  const studentToUpdate = {
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    note: req.body.note,
  };
  Student.updateMany({ age: { $gte: 21 } }, studentToUpdate, (err, docs) => {
    err
      ? res.status(400).send(err)
      : res.status(200).send({
          message: "Se han modificado correctamente los estudiantes",
          estudiantes: docs,
        });
  });
});

// Promedio
studentRoutes.route("/mean").get((req, res) => {
  let notes = 0;
  let mean = 0;
  Student.find((err, students) => {
    if (err) {
      res.status(400).send(err);
    } else
      students.forEach((student) => {
        notes = notes + student.note;
      });
    mean = notes / students.length;
    res.status(200).send({promedio: mean});
  });
});

// Obtener un estudiante
studentRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Student.findById(id, (err, student) => {
    res.status(200).send(student);
  });
});
// Defined delete | remove | destroy route
studentRoutes.route("/delete/:id").get((req, res) => {
  Student.findByIdAndRemove({ _id: req.params.id }, (err, student) => {
    err
      ? res.status(400).send(err)
      : res.status(200).send("El estudiante ha sido eliminado correctamente");
  });
});

module.exports = studentRoutes;
