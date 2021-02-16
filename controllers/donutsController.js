const { Donut } = require("../db/models");
const { Shop } = require("../db/models");

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
      attributes: { exclude: ["shopId", "createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["id"],
      },
    });
    res.json(donuts);
  } catch (error) {
    next(error);
  }
};

exports.donutDetail = async (req, res, next) => {
  res.json(req.donut);
};

exports.updateDonut = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedDonut = await req.donut.update(req.body);
    res.status(201).json(updatedDonut);
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
