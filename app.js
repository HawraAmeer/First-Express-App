const express = require("express");

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

app.post("/donuts", async (req, res) => {
  try {
    const newDonut = await Donut.create(req.body);
    res.status(201).json(newDonut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/donuts/:donutId", async (req, res) => {
  try {
    const foundDonut = await Donut.findByPk(req.params.donutId);
    if (foundDonut) {
      await foundDonut.update(req.body);
      res.status(204).end();
    } else res.status(404).json({ message: "Donut not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/donuts/:donutId", async (req, res) => {
  try {
    const foundDonut = await Donut.findByPk(req.params.donutId);
    if (foundDonut) {
      await foundDonut.destroy();
      res.status(204).end();
    } else res.status(404).json({ message: "Donut not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

db.sequelize.sync();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
