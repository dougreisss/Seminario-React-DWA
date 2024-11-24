const db = require('../config/db');

const GenresBook = {
    getGenreByBookId: (bookId, callback) => {
        const query = "SELECT * FROM book_genres where book_id = ?";
        db.query(query, [bookId], callback);
    },

    createBookGenres: (genresBook, callback) => {
        const query = "INSERT INTO book_genres SET ?";
        db.query(query, [genresBook], callback);
    },

    deleteBookGenre: (bookGenre, callback) => {
        const query = "DELETE FROM book_genres WHERE book_id = ? and genre_id = ? ";
        db.query(query, [bookGenre.book_id, bookGenre.genre_id], callback);
    }
}

module.exports = GenresBook;

