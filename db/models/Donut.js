module.exports = (sequelize, DataTypes) =>
  sequelize.define("Donut", {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
