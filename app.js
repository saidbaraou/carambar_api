const express = require('express');
const sequelize = require ('./database/database.js')
const blagueRoutes = require ('./routes/v1/blagueRoutes.js');
const blague = require('./models/Blague')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/blagues', blagueRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée.');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  });