import React, { useEffect, useState } from 'react';
import { updateBook } from '../../Services/apiBook';
import { getAuthors } from '../../Services/apiAuthor';

function UpdateBookForm( {book, onUpdateComplete }) {

    const [updatedBook, setUpdatedBook] = useState( {...book });
    const [authors, setAuthors] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook( (prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateBook(updatedBook);
            onUpdateComplete();
        } catch (error) {
            console.error('Erro ao atualizar livro: ', error.message);
        }
    };

    const handleChangeAuthor = (e) => {
        const authorId = e.target.value;
        setUpdatedBook((prevBook) => ({
            ...prevBook,
            author_id: authorId,
        }));
    };

    useEffect(() => {

        const fetchAuthor = async () => {
            const data = await getAuthors();
            setAuthors(data);
        };

        fetchAuthor();

    }, []);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
        const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda
        return `${year}-${month}-${day}`;
    };


    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
                <label className="block text-gray-700">Título:</label>
                <input
                    type="text"
                    name="title"
                    value={updatedBook.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Sinopse:</label>
                <textarea
                    name="synopsis"
                    value={updatedBook.synopsis}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Autor:</label>
                <select
                    name="author_id"
                    value={updatedBook.author_id || ""}
                    onChange={handleChangeAuthor}
                    className="w-full border border-gray-300 p-2 rounded"
                >
                    <option value="" disabled>
                        --- Selecione um autor ---
                    </option>
                    {authors.map((author) => (
                        <option key={author.author_id} value={author.author_id}>
                            {author.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Data de Publicação:</label>
                <input
                    type="date"
                    name="publication_date"
                    value={formatDateForInput(updatedBook.publication_date)}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Atualizar Livro
            </button>
        </form>  
    );
}

export default UpdateBookForm;
