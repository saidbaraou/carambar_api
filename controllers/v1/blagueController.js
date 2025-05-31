const Blague = require('../../models/Blague');
<<<<<<< HEAD
const { Op } = require('sequelize');
=======
const { Sequelize } = require('sequelize');
>>>>>>> feat/controllers

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
<<<<<<< HEAD
=======
}

exports.getAllBlagues = async (req, res) => {
  try {
    const allBlagues = await Blague.findAll();
    res.status(200).json(allBlagues);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues.', details: error.message });
  }
}

exports.getBlagueById = async (req, res) => {
  try {
    const { id } = req.params;
    const blague = await Blague.findByPk(id);
    if (!blague) {
      return res.status(404).json({ error: 'Blague non trouvée.' });
    }
    res.status(200).json(blague);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague.', details: error.message });
  }
}

exports.getRandomBlague = async (req, res) => {
  try {
    const randomBlague = await Blague.findOne({
      order: Sequelize.literal('RANDOM()')
    });
    if (!randomBlague) {
      return res.status(404).json({ error: 'Aucune blague trouvée.' });
    }
    re.status(200).json(randomBlague);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération d\'une blague aléatoire.', details: error.message });
  }
>>>>>>> feat/controllers
}