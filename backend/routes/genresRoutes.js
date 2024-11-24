const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.getAllGenres);
router.get('/id/:id', genresController.getByIdGenres);
router.get('/bookGenre/id/:id', genresController.getGenreByBookId);
router.post('/', genresController.createGenres);
router.post('/bookGenre', genresController.createBookGenres);
router.put('/id/:id', genresController.updateGenres);
router.delete('/id/:id', genresController.deleteGenres);

module.exports = router;
