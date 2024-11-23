import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createBook } from '../../Services/apiBook';
import { getAuthors } from '../../Services/apiAuthor';

function CreateBookForm() {

    const navigate = useNavigate();

    const [newBook, setNewBook] = useState({
        title: '',
        synopsis: '',
        author_id: null,
        publication_date: '',
    });

    const [authors, setAuthors] = useState([]);

    useEffect(() => {

        const fetchAuthor = async () => {
            const data = await getAuthors();
            setAuthors(data);
        };

        fetchAuthor();

    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBook(newBook);
            handleBackToBooks();
            setNewBook({
                title: '',
                synopsis: '',
                author_id: null,
                publication_date: '',
            });
        } catch (error) {
            console.error('Erro ao criar livro:', error.message);
        }
    };

    const handleChangeAuthor = (e) => {
        const authorId = e.target.value;
        setNewBook((prevBook) => ({
            ...prevBook,
            author_id: authorId,
        }));
    };

    const handleBackToBooks = () => {
        navigate('/books');
    }
   
    return (
        <div className="max-w-3xl mx-auto p-4">

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Criar um novo livro</h2>

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
                        value={newBook.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sinopse:</label>
                    <textarea
                        name="synopsis"
                        value={newBook.synopsis}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Autor:</label>
                    <select 
                        name="author_id"  
                        value={newBook.author_id || ""}
                        onChange={handleChangeAuthor} 
                        className="w-full border border-gray-300 p-2 rounded">
                        <option value="" disabled>
                            --- Selecione um autor --
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
                        value={newBook.publication_date}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Criar Livro
                </button>
            </form>
        </div>
    );
}

export default CreateBookForm;
