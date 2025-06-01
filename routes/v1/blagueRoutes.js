const express = require('express');
const router = express.Router();
const blagueController = require('../../controllers/v1/blagueController');

// Route to add a new blague
router.post('/api/v1/add', blagueController.addBlague);

// Route to get all blagues
router.get('/api/v1/all', blagueController.getAllBlagues);

// Route to get a blague by ID
router.get('/api/v1/:id', blagueController.getBlagueById);

// Route to get a random blague
router.get('/api/v1/random', blagueController.getRandomBlague);


module.exports = router;