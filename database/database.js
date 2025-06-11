const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const dbPath = path.join(__dirname, 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

try {
  sequelize.authenticate();
  console.log('Connection to the SQLite database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the SQLite database:', error);
}

module.exports = sequelize;