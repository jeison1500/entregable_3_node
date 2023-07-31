const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Transfer = db.define('Transfer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Transfer;
