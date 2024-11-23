import React, { useEffect, useState } from 'react';
import { createBook, getAuthors } from '../../Services/api';

function CreateBookForm({ onBookCreated }) {
    
    const [newBook, setNewBook] = useState({
        title: '',
        synopsis: '',
        author_id: null,
        publication_date: '',
    });

    const [authors, setAuthors] = useState([]);

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
            const createdBook = await createBook(newBook);
            onBookCreated(createdBook); // Chama a função passada para atualizar a lista
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

    useEffect( () => {

        const fetchAuthor = async () => {
            const data = await getAuthors();
            setAuthors(data);
        };

        fetchAuthor();

    }, []);

    return (
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
    );
}

export default CreateBookForm;
