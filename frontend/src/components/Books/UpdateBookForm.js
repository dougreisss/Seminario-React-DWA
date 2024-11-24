import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBookById, updateBook } from '../../Services/apiBook';
import { getAuthors } from '../../Services/apiAuthor';
import { getGenres } from '../../Services/apiGenre';
import { getGenreByBookId, createBookGenre, deleteBookGenre } from '../../Services/apiGenreBook';

function UpdateBookForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados no formulário
    const [initialGenres, setInitialGenres] = useState([]);  // Gêneros originalmente associados ao livro

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);

                const authorsData = await getAuthors();
                setAuthors(authorsData);

                const allGenresData = await getGenres();
                setAllGenres(allGenresData);

                const genresByBook = await getGenreByBookId(id);

                setInitialGenres(genresByBook.map((genre) => genre.genre_id));
                setSelectedGenres(genresByBook.map((genre) => genre.genre_id));
            } catch (error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value);
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genreId)
                ? prevSelected.filter((id) => id !== genreId) // Remove o gênero se já estiver selecionado
                : [...prevSelected, genreId] // Adiciona o gênero
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Atualiza o livro
            await updateBook(book);

            // Identifica gêneros a adicionar e a remover
            const genresToAdd = selectedGenres.filter((id) => !initialGenres.includes(id));
            const genresToRemove = initialGenres.filter((id) => !selectedGenres.includes(id));

            // Atualiza gêneros no backend
            if (genresToAdd.length > 0) {

                const promises = genresToAdd.map((genreId) =>
                    createBookGenre({ book_id: book.book_id, genre_id: genreId })
                );

                await Promise.all(promises);

            }
            if (genresToRemove.length > 0) {

                const promises = genresToRemove.map((genreId) =>
                    deleteBookGenre({ book_id: book.book_id, genre_id: genreId })
                );

                await Promise.all(promises);

            }

            handleBackToBooks(); // Redireciona para a lista de livros após a atualização
        } catch (error) {
            console.error('Erro ao atualizar livro:', error.message);
        }
    };

    const handleBackToBooks = () => {
        navigate('/books');
    };

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
                        onChange={(e) =>
                            setBook((prevBook) => ({
                                ...prevBook,
                                author_id: e.target.value,
                            }))
                        }
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
                    <label className="block text-gray-700">Gêneros:</label>
                    <div className="grid grid-cols-2 gap-2">
                        {allGenres.map((genre) => (
                            <label key={genre.genre_id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={genre.genre_id}
                                    checked={selectedGenres.includes(genre.genre_id)}
                                    onChange={handleGenreChange}
                                    className="form-checkbox"
                                />
                                <span>{genre.name}</span>
                            </label>
                        ))}
                    </div>
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
