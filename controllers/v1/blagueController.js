
const sequelize = require('../../database/database.js');
const blague = require('../../models/blague.js');

exports.addBlague = async (req, res) => {
  try {
    const { question, reponse } = req.body;
    if (!question || !reponse) {
      return res.status(400).json({ error: 'La question et la réponse sont requises.' });
    }
    const newBlague = await blague.create({ question, reponse });
    res.status(201).json(newBlague);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Cette blague existe déjà.' });
    } 
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague.', details: error.message });
  }
}

exports.getRandomBlague = async (req, res) => {
  try {
      const randomBlague = await blague.findOne({
        order: [
          sequelize.literal('RANDOM()')
        ],
        limit: 1
    });
    if (!randomBlague) {
      return res.status(404).json({ error: 'Aucune blague trouvée.' });
    }
    res.status(200).json(randomBlague);
    randomBlague.toJSON();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération d\'une blague aléatoire.', details: error.message });
  }
}

exports.getAllBlagues = async (req, res) => {
  try {
    const allBlagues = await blague.findAll();
    res.status(200).json(allBlagues);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues.', details: error.message });
  }
}

exports.getBlagueById = async (req, res) => {
  try {
    const { id } = req.params;
    const blagueById = await blague.findByPk(id);
    if (!blagueById) {
      return res.status(404).json({ error: 'Blague non trouvée.' });
    }
    res.status(200).json(blagueById);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague.', details: error.message });
  }
}

