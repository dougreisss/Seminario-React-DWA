const Genres = require('../models/genresModel');

exports.getAllGenres = (req, res) => {
    Genres.getAll((err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

exports.getByIdGenres = (req, res) => {

    const genresId = req.params.id;

    Genres.getById(genresId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });

};

exports.getGenreByBookId = (req, res) => {

    const bookId = req.params.id;

    Genres.getGenreByBookId(bookId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);

    });

};

exports.createGenres = (req, res) => {

    const genres = req.body;

    Genres.create(genres, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'Genero criado com sucesso', genresId: results.insertId });

    });

};

exports.createBookGenres = (req, res) => {

    const genresBook = req.body;

    Genres.createBookGenres(genresBook, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'Genero do livro criado com sucesso', genresId: results.insertId });

    });

};

exports.updateGenres = (req, res) => {

    const genresId = req.params.id;
    const genres = req.body;

    Genres.update(genresId, genres, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Genero atualizado com sucesso' });

    });

};

exports.deleteGenres = (req, res) => {

    const genresId = req.params.id;

    Genres.delete(genresId, (err, result) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Genero excluído com sucesso' });

    });

};

exports.deleteBookGenre = (req, res) => {

    const genresBook = req.body;

    Genres.deleteBookGenre(genresBook, (err, result) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Genero do livro excluído com sucesso' });

    });

};