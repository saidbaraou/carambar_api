const Blague = require('../../models/Blague');
const { Op } = require('sequelize');

exports.addBlague = async (req, res) => {
  try {
    const { question, reponse } = req.body;
    if (!question || !reponse) {
      return res.status(400).json({ error: 'La question et la réponse sont requises.' });
    }
    const newBlague = await Blague.create({ question, reponse });
    res.status(201).json(newBlague);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Cette blague existe déjà.' });
    }
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague.', details: error.message });
  }
}