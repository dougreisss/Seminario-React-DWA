const db = require('../config/db');

const Book = {
    getAll: (callback) => {
        const query = 'SELECT book_id, title, author_id, synopsis, date_format(publication_date, "%Y-%m-%d") as publication_date, cover_image, average_rating, date_format(created_at, "%Y-%m-%d") as created_at FROM books;';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT book_id, title, author_id, synopsis, date_format(publication_date, "%Y-%m-%d") as publication_date, cover_image, average_rating, date_format(created_at, "%Y-%m-%d") as created_at FROM books WHERE book_id = ?';
        db.query(query, [id], callback);
    },

    getAllWithDetails: (callback) => {
        const query = `SELECT 
                        b.book_id,
                        b.title,
                        b.synopsis,
                        b.publication_date,
                        b.cover_image,
                        b.average_rating,
                        a.author_id,
                        a.name,
                        a.bio,
                        GROUP_CONCAT(g.name) as book_genres,
                        COUNT(r.rating) as rating,
                        AVG(r.rating) as rating_media,
                        rv.review_id,
                        rv.review_text,
                        u.user_id,
                        u.username 
                    FROM books b
                    LEFT JOIN authors a ON b.author_id = a.author_id
                    LEFT JOIN book_genres bg ON b.book_id = bg.book_id
                    LEFT JOIN genres g ON bg.genre_id = g.genre_id
                    LEFT JOIN reviews rv ON b.book_id = rv.book_id
                    LEFT JOIN users u ON rv.user_id = u.user_id
                    LEFT JOIN ratings r ON b.book_id = r.book_id
                    GROUP BY b.book_id, rv.review_id, u.user_id
                    ORDER BY b.book_id;`;
        db.query(query, callback);
    },

    create: (bookData, callback) => {
        const query = 'INSERT INTO books SET ?';
        db.query(query, bookData, callback);
    },

    update: (id, bookData, callback) => {
        const query = 'UPDATE books SET ? WHERE book_id = ?';
        db.query(query, [bookData, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM books WHERE book_id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Book;
