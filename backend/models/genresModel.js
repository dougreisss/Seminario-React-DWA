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

    getGenreByBookId: (bookId, callback) => {
        const query = "SELECT * FROM book_genres where book_id = ?";
        db.query(query, [bookId], callback);
    },

    create: (genres, callback) => {
        const query = "INSERT INTO genres SET ?";
        db.query(query, [genres], callback);
    },

    createBookGenres: (genresBook, callback) => {
        const query = "INSERT INTO book_genres SET ?";
        db.query(query, [genresBook], callback);
    },

    update: (id, genres, callback) => {
        const query = "UPDATE genres SET ? WHERE genre_id = ?";
        db.query(query, [genres, id], callback);
    },

    delete: (id, callback) => {
        const query = "DELETE FROM genres WHERE genre_id = ?";
        db.query(query, [id], callback);
    },

    deleteBookGenre: (bookGenre, callback) => {
        const query = "DELETE FROM book_genres WHERE book_id = ? and genre_id = ? ";
        db.query(query, [bookGenre.book_id, bookGenre.genre_id], callback);
    }
};

module.exports = Genres;
