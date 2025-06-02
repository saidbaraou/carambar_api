const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const Blague = sequelize.define('Blague', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  reponse: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

module.exports = Blague;
       