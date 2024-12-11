const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReview);
router.get('/id/:id', reviewController.getByIdReview);
router.post('/', reviewController.createReview);
router.put('/id/:id', reviewController.updateReview);
router.delete('/id/:id', reviewController.deleteReview);

module.exports = router;
