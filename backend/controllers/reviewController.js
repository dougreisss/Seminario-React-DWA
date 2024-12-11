const Review = require('../models/reviewModel');

exports.getAllReview = (req, res) => {

    Review.getAll((err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.json(results);
    });

};


exports.getByIdReview = (req, res) => {

    const reviewId = req.params.id;

    Review.getById(reviewId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Review nao encontrado' });
        }

        res.json(results[0]);
    });

};

exports.createReview = (req, res) => {

    const review = req.body;

    Review.create(review, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'Review criado com sucesso', reviewId: results.insertId });

    });

};

exports.updateReview = (req, res) => {

    const reviewId = req.params.id;
    const review = req.body;

    Review.update(reviewId, review, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Review atualizado com sucesso' });

    });

};

exports.deleteReview = (req, res) => {

    const reviewId = req.params.id;

    Review.delete(reviewId, (err, result) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Review excluído com sucesso' });

    });

};