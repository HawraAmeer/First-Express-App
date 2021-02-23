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
    const foundShop = await Shop.findByPk(req.donut.shopId);
    if (!foundShop) {
      const err = new Error("Create a shop first!");
      err.status = 401;
      next(err);
    }
    if (foundShop.userId !== req.user.id) {
      const err = new Error(
        "You are not the owner, you can't update this shop products."
      );
      err.status = 401;
      next(err);
    }

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
    const foundShop = await Shop.findByPk(req.donut.shopId);
    if (!foundShop) {
      const err = new Error("Create a shop first!");
      err.status = 401;
      next(err);
    }
    if (foundShop.userId !== req.user.id) {
      const err = new Error(
        "You are not the owner, you can't delete this shop products."
      );
      err.status = 401;
      next(err);
    }

    await req.donut.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
