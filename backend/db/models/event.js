"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.EventImage, { foreignKey: "eventId" });
      Event.belongsToMany(models.Users, {
        through: models.Attendance,
        foreignKey: "eventId",
        otherKey: "userId",
      });
    }
  }
  Event.init(
    {
      venueId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.ENUM,
      capacity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
