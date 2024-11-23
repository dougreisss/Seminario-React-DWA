const db = require('../config/db');

const Genres = {
    getAll: (callback) => {
        const query = "SELECT * FROM genres";
        db.query(query, callback);
    }

    // TO DO CRUD GENRES
};

module.exports = Genres;
