const { Donut } = require("../db/models");

exports.donutList = async (req, res) => {
  try {
    const donuts = await Donut.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(donuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDonut = async (req, res) => {
  try {
    const newDonut = await Donut.create(req.body);
    res.status(201).json(newDonut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDonut = async (req, res) => {
  try {
    const foundDonut = await Donut.findByPk(req.params.donutId);
    if (foundDonut) {
      await foundDonut.update(req.body);
      res.status(204).end();
    } else res.status(404).json({ message: "Donut not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDonut = async (req, res) => {
  try {
    const foundDonut = await Donut.findByPk(req.params.donutId);
    if (foundDonut) {
      await foundDonut.destroy();
      res.status(204).end();
    } else res.status(404).json({ message: "Donut not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
