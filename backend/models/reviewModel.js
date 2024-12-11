const db = require('../config/db');

const Review = {

    getAll: (callback) => {
        const query = "SELECT r.review_id, b.book_id, b.title, r.review_text, r.created_at FROM reviews r INNER JOIN books b on r.book_id = b.book_id;";
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = "SELECT * FROM reviews where genre_id = ?";
        db.query(query, [id], callback);
    },

    create: (review, callback) => {
         const query = "INSERT INTO reviews SET ?";
         db.query(query, [review], callback);
    },

    update: (id, review, callback) => {
        const query = "UPDATE reviews SET ? WHERE review_id = ?";
        db.query(query, [review, id], callback);
    },

    delete: (id, callback) => {
        const query = "DELETE FROM reviews WHERE review_id = ?";
        db.query(query, [id], callback);
    }
};

module.exports = Review;
