import styles from './BookList.module.css';
import React, { useState, useEffect } from 'react';
import { getBooks } from '../../api';
import { format } from 'date-fns';

function BookList() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Livros</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Sinopse</th>
                        <th>Data de Publicação</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.book_id}>
                            <td>{book.title}</td>
                            <td>{book.synopsis}</td>
                            <td>{formatDate(book.publication_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;

