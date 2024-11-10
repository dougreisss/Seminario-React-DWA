const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.get('/', bookController.getAllBooks);
router.get('/id/:id', bookController.getBookById);
router.get('/details', bookController.getAllWithDetails)
router.post('/', bookController.createBook);
router.put('/id/:id', bookController.updateBook);
router.delete('/id/:id', bookController.deleteBook);

module.exports = router;
