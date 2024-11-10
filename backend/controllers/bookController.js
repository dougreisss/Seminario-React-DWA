const db = require('../config/db');

exports.getBooks = (req, res) => {
    db.query('SELECT * FROM railway.book', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};