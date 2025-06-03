const express = require('express');
const cors = require('cors');
const sequelize = require ('./database/database.js')
const blagueRoutes = require ('./routes/v1/blagueRoutes.js');
const blague = require('./models/Blague')

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500/', // <-- REMPLACEZ PAR L'URL DE VOTRE FRONTEND RENDER
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Autorise l'envoi de cookies d'authentification si vous en aviez
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions)); // <-- Utilisez le middleware CORS

app.use(express.json());
app.use('/api/v1/blagues', blagueRoutes);

sequelize.sync({ force: false })
  .then(async () => {
    console.log('Base de données synchronisée.');
    try {
      const testRandomBlague = await blague.findOne({
        order: [
          sequelize.literal('RANDOM()')
        ],
        limit: 1
      });
      if (testRandomBlague) {
        console.log('TEST RANDOM BLAGUE RÉUSSI :', testRandomBlague.toJSON());
      } else {
        console.log('TEST RANDOM BLAGUE : Aucune blague trouvée (ceci est la source du problème).');
      }
    } catch (testError) {
      console.error('TEST RANDOM BLAGUE ERREUR :', testError);
    }
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  });