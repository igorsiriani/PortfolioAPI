const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio-controller');

//Portfolio routes
router.post('/', portfolioController.post);

router.get('/', portfolioController.getAll);

router.get('/:portfolioId', portfolioController.getById);

router.put('/:portfolioId', portfolioController.put);

router.delete('/:portfolioId', portfolioController.delete);

module.exports = router;