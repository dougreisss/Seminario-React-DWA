import '../App.css';
import React, { useState, useEffect } from 'react';
import { getBooks } from '../api';

function BookList() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Lista de Livros</h2>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Sinopse</th>
                        <th>Data de publicação</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.book_id}>
                            <td>{book.title}</td>
                            <td>{book.synopsis}</td>
                            <td>{book.publication_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;

