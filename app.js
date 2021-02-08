const express = require("express");
let donuts = require("./donuts");

const db = require("./db/models");
const { Donut } = require("./db/models");

const app = express();
app.use(express.json());

app.get("/home", (req, res) => {
  res.json({ message: "Hello, welcome to your home!" });
});

app.get("/donuts", async (req, res) => {
  try {
    const donuts = await Donut.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(donuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/donuts/:donutId", (req, res) => {
  const foundDonut = donuts.find((donut) => donut.id === +req.params.donutId);
  if (foundDonut) {
    donuts = donuts.filter((donut) => donut !== foundDonut);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Donut not found" });
  }
});

app.post("/donuts", (req, res) => {
  req.body.id = donuts[donuts.length - 1].id + 1;
  donuts.push(req.body);
  res.status(201).json(req.body);
});

db.sequelize.sync();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
