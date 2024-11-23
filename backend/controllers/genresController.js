const Genres = require('../models/genresModel');

exports.getAllGenres = (req, res) => {
    Genres.getAll((err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

// TO DO CRUD GENRES