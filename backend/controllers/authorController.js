const Authors = require('../models/authorModel');

exports.getAllAuthor = (req, res) => {

    Authors.getAll( (err, results) => {
        
        if (err) {
            return res.status(500).json( {error:  err.message })
        }

        res.json(results);
    });

};

exports.getAuthorById = (req, res) => {

    const authorId = req.params.id;

    Authors.getById(authorId, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }
        
        res.json(results[0]);
    });

};

exports.createAuthor = (req, res) => {

    const author = req.body;

    Authors.create(author, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(201).json({ message: 'Autor criado com sucesso', author: results.insertId });

    });

};

exports.updateAuthor = (req, res) => {

    const authorId = req.params.id;
    const updatedAuthor = req.body;

    Authors.update(authorId, updatedAuthor, (err, results) => {

        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.json({ message: 'Autor atualizado com sucesso' });

    });

};

exports.deleteAuthor = (req, res) => {

    const authorId = req.params.id;

    Authors.delete(authorId, (err) => {

        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.json({ message: 'Autor excluído com sucesso' });

    });

};