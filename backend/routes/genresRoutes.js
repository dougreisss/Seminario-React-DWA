const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.getAllGenres);
router.get('/id/:id', genresController.getByIdGenres);
router.post('/', genresController.createGenres);
router.put('/id/:id', genresController.updateGenres);
router.delete('/id/:id', genresController.deleteGenres);

module.exports = router;
