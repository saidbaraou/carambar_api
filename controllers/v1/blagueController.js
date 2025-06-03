import { create, findAll, findByPk, findOne } from '../../models/blague.js';
import { literal } from '../../database/database.js';

export async function addBlague(req, res) {
  try {
    const { question, reponse } = req.body;
    if (!question || !reponse) {
      return res.status(400).json({ error: 'La question et la réponse sont requises.' });
    }
    const newBlague = await create({ question, reponse });
    res.status(201).json(newBlague);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Cette blague existe déjà.' });
    }
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague.', details: error.message });
  }
}

export async function getAllBlagues(req, res) {
  try {
    const allBlagues = await findAll();
    res.status(200).json(allBlagues);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues.', details: error.message });
  }
}

export async function getBlagueById(req, res) {
  try {
    const { id } = req.params;
    const blagueById = await findByPk(id);
    if (!blagueById) {
      return res.status(404).json({ error: 'Blague non trouvée.' });
    }
    res.status(200).json(blagueById);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague.', details: error.message });
  }
}

export async function getRandomBlague(req, res) {
  try {
      const randomBlague = await findOne({
        order: [
          literal('RANDOM()')
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