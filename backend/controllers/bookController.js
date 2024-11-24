const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
    Book.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.getAllWithDetails = (req, res) => {
    Book.getAllWithDetails((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.getBookById = (req, res) => {
    const bookId = req.params.id;
    Book.getById(bookId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(results[0]);
    });
};

exports.createBook = (req, res) => {
    const newBook = req.body;
    Book.create(newBook, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Livro criado com sucesso', book_id: results.insertId });
    });
};

exports.updateBook = (req, res) => {

    const bookId = req.params.id;
    const updatedBook = req.body;
    
    Book.update(bookId, updatedBook, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Livro atualizado com sucesso' });
    });
};

exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    Book.delete(bookId, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Livro excluído com sucesso' });
    });
};
