const express = require('express');
const cors = require('cors');
const sequelize = require ('./database/database.js')
const blagueRoutes = require ('./routes/v1/blagueRoutes.js');
const blague = require('./models/blague.js')

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'https://carambar-front-998b.onrender.com', // Render front
    'https://saidbaraou.github.io'             // Github pages front
],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/v1/blagues', blagueRoutes);

sequelize.sync({ force: false })
  .then(async () => {
    console.log('Base de données synchronisée.');
    
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  });