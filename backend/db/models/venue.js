"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Venue.belongsToMany(models.Group, {
      //   through: models.Event,
      //   foreignKey: "venueId",
      //   otherKey: "groupId",
      // });

      Venue.hasMany(models.Event, { foreignKey: "venueId" });
      Venue.belongsTo(models.Group, { foreignKey: "groupId" });
    }
  }
  Venue.init(
    {
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          min: -180,
          max: 180,
        },
      },
    },
    {
      sequelize,
      modelName: "Venue",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Venue;
};
