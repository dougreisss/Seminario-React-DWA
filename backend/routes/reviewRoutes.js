const express = require('express');
const router = express.Router();
const genresController = require('../controllers/reviewController');

router.get('/', genresController.getAllReview);
router.get('/id/:id', genresController.getByIdReview);
router.post('/', genresController.createReview);
router.put('/id/:id', genresController.updateReview);
router.delete('/id/:id', genresController.deleteReview);

module.exports = router;
