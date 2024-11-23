import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBookById, updateBook } from '../../Services/apiBook';
import { getAuthors } from '../../Services/apiAuthor';

function UpdateBookForm() {

    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {

        const fetchBookAndAuthors = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);

                const authorsData = await getAuthors();
                setAuthors(authorsData);
            } catch (error) {
                console.error('Erro ao buscar livro e autores:', error.message);
            }
        };

        fetchBookAndAuthors();

    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(book);
            handleBackToBooks(); // Redireciona para a lista de livros após a atualização
        } catch (error) {
            console.error('Erro ao atualizar livro:', error.message);
        }
    };

    const handleChangeAuthor = (e) => {
        const authorId = e.target.value;
        setBook((prevBook) => ({
            ...prevBook,
            author_id: authorId,
        }));
    };

    const handleBackToBooks = () => {
        navigate('/books');
    }

    if (!book) {
        return <p className="text-center text-gray-600">Carregando livro...</p>;
    }

    if (book.message === "Livro não encontrado") {
        return (
            <div className="text-center mt-8">
                <h1 className="text-red-600 text-lg font-semibold">{book.message}</h1>
                <p className="font-semibold">Não foi encontrado nenhum livro para este id</p>
                <button
                    onClick={() => handleBackToBooks()}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Voltar para a Lista de Livros
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Editar livro</h2>

            <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mb-4"
                onClick={() => handleBackToBooks()}
            >
                Voltar para a Lista
            </button>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700">Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sinopse:</label>
                    <textarea
                        name="synopsis"
                        value={book.synopsis}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Autor:</label>
                    <select
                        name="author_id"
                        value={book.author_id || ""}
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
                        value={book.publication_date}
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
        </div>
        
    );
}

export default UpdateBookForm;
