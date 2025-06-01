const express = require('express');
const sequelize = require ('./database/database.sqlite')
const blagueRoutes = require ('./routes/v1/blagueRoutes');
const Blague = require('./models/Blague');