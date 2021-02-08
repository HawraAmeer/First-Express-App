const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Donut = sequelize.define("Donut", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: { min: 1 },
    },
    image: { type: DataTypes.STRING, allowNull: false },
  });

  SequelizeSlugify.slugifyModel(Donut, {
    source: ["name"],
  });
  return Donut;
};
