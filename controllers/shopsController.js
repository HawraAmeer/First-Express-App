const { Donut } = require("../db/models");
const { Shop } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    return await Shop.findByPk(shopId);
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Donut,
        as: "donuts",
        attributes: ["id"],
      },
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.createShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res, next) => {
  res.json(req.shop);
};

exports.updateShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedShop = await req.shop.update(req.body);
    res.status(201).json(updatedShop);
  } catch (error) {
    next(error);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.createDonut = async (req, res, next) => {
  try {
    req.body.shopId = req.shop.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newDonut = await Donut.create(req.body);
    res.status(201).json(newDonut);
  } catch (error) {
    next(error);
  }
};
