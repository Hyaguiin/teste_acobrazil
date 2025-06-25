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
    },
    brakesOk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    lightsOk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
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
