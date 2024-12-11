import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBookById } from '../../Services/apiBook';
import { createReview } from '../../Services/apiReview';

function CreateReviewForm() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        };

        fetchBookDetails();
    }, [id]);

    const [newReview, setNewReview] = useState({
        book_id: id,
        user_id: 1,
        review_text: '',
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            await createReview(newReview);
            
            handleBackToBooks();

            setNewReview({
                book_id: 0,
                user_id: 0,
                review_text: ''
            });

        } catch (error) {
            console.error('Erro ao criar livro:', error.message);
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Criar review</h2>

            <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mb-4"
                onClick={() => handleBackToBooks()}
            >
                Voltar para a Lista
            </button>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{book.title}</h3>
                    <p className="text-gray-700 mb-4">{book.synopsis}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Digite a review:</label>
                    <textarea
                        name="review_text"
                        value={newReview.review_text}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    ></textarea>
                </div>
             
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Criar Review
                </button>
            </form>
        </div>
    );
}

export default CreateReviewForm;
