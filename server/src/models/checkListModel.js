const { DataTypes } = require("sequelize");
const sequelize = require("../config/database/db");
const User = require("./userModel");

const Checklist = sequelize.define(
  "Checklist",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("start", "end"),
      allowNull: false,
    },
    tiresOk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "tires_ok", 
    },
    brakesOk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "brakes_ok",
    },
    lightsOk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "lights_ok",
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "createdAt", 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updatedAt",
    },
  },
  {
    tableName: "checklists",
    timestamps: true,
  }
);

Checklist.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Checklist, { foreignKey: "userId" });

module.exports = Checklist;
