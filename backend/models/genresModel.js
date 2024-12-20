const db = require('../config/db');

const Genres = {
    getAll: (callback) => {
        const query = "SELECT * FROM genres";
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = "SELECT * FROM genres where genre_id = ?";
        db.query(query, [id], callback);
    },

    create: (genres, callback) => {
        const query = "INSERT INTO genres SET ?";
        db.query(query, [genres], callback);
    },

    update: (id, genres, callback) => {
        const query = "UPDATE genres SET ? WHERE genre_id = ?";
        db.query(query, [genres, id], callback);
    },

    delete: (id, callback) => {
        const query = "DELETE FROM genres WHERE genre_id = ?";
        db.query(query, [id], callback);
    }

};

module.exports = Genres;
