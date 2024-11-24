const express = require('express');
const router = express.Router();
const genresBookController = require('../controllers/genresBookController');

router.get('/id/:id', genresBookController.getGenreByBookId);
router.post('/', genresBookController.createBookGenres);
router.post('/delete/', genresBookController.deleteBookGenre);

module.exports = router;


