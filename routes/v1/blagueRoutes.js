const express = require('express');
const router = express.Router();
const blagueController = require('../../controllers/v1/blagueController');

// Route to add a new blague
router.post('/add', blagueController.addBlague);

// Route to get all blagues
router.get('/all', blagueController.getAllBlagues);

// Route to get a blague by ID
router.get('/:id', blagueController.getBlagueById);

// Route to get a random blague
router.get('/random', blagueController.getRandomBlague);


module.exports = router;