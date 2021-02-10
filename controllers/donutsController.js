const { Donut } = require("../db/models");

exports.fetchDonut = async (donutId, next) => {
  try {
    return await Donut.findByPk(donutId);
  } catch (error) {
    next(error);
  }
};

exports.donutList = async (req, res, next) => {
  try {
    const donuts = await Donut.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(donuts);
  } catch (error) {
    next(error);
  }
};

exports.createDonut = async (req, res, next) => {
  try {
    const newDonut = await Donut.create(req.body);
    res.status(201).json(newDonut);
  } catch (error) {
    next(error);
  }
};

exports.donutDetail = async (req, res, next) => {
  res.json(req.donut);
};

exports.updateDonut = async (req, res, next) => {
  try {
    await req.donut.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.deleteDonut = async (req, res, next) => {
  try {
    await req.donut.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
