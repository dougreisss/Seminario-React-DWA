const db = require('../config/db');

const Author = {

    getAll: (callback) => {
        const query = 'SELECT * FROM authors';
        db.query(query, callback)
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM authors WHERE author_id = ?';
        db.query(query, [id], callback);
    },

    create: (authorData, callback) => {
        const query = 'INSERT INTO authors SET ?';
        db.query(query, authorData, callback);
    },

    update: (id, authorData, callback) => {
        const query = 'UPDATE authors SET ? where author_id = ?';
        db.query(query, [authorData, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM authors where author_id = ?';
        db.query(query, [id], callback)
    }
}

module.exports = Author;