const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
  });
