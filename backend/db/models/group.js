"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.Event, { foreignKey: "groupId" });
      Group.hasMany(models.GroupImage, { foreignKey: "groupId" });
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: "groupId",
        otherKey: "userId",
      });
      Group.belongsToMany(models.Venues, {
        through: models.Event,
        foreignKey: "groupId",
        otherKey: "venueId",
      });
      Group.belongsTo(models.User, { foreignKey: "organizerId" });
    }
  }
  Group.init(
    {
      organizerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      about: DataTypes.TEXT,
      type: DataTypes.ENUM,
      private: DataTypes.BOOLEAN,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
