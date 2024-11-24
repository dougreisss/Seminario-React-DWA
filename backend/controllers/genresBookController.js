const GenresBook = require('../models/genresBookModel');

exports.getGenreByBookId = (req, res) => {

    const bookId = req.params.id;

    GenresBook.getGenreByBookId(bookId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);

    });

};

exports.createBookGenres = (req, res) => {

    const genresBook = req.body;

    GenresBook.createBookGenres(genresBook, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'Genero do livro criado com sucesso', genresId: results.insertId });

    });

};

exports.deleteBookGenre = (req, res) => {

    const genresBook = req.body;

    GenresBook.deleteBookGenre(genresBook, (err, result) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Genero do livro excluído com sucesso' });

    });

};