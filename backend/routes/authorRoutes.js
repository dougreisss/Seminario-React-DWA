const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAllAuthor);
router.get('/id/:id', authorController.getAuthorById);
router.post('/', authorController.createAuthor);
router.put('/id/:id', authorController.updateAuthor);
router.delete('/id/:id', authorController.deleteAuthor)

module.exports = router;