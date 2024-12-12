import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { updateReview, getReviewById } from '../../Services/apiReview';

function UpdateReviewForm () {

    const { id } = useParams();
    const navigate = useNavigate();

    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const reviewData = await getReviewById(id);
                setReview(reviewData);

            } catch (error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        };

        fetchReview();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await updateReview(review);
            
            handleBackToReview(); // Redireciona para a lista de livros após a atualização
        } catch (error) {
            console.error('Erro ao atualizar livro:', error.message);
        }
    };

    const handleBackToReview = () => {
        navigate('/review');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    if (!review) {
        return <p className="text-center text-gray-600">Carregando reviews...</p>;
    }

    if (review.message === "Review nao encontrado") {
        return (
            <div className="text-center mt-8">
                <h1 className="text-red-600 text-lg font-semibold">{review.message}</h1>
                <p className="font-semibold">Não foi encontrado nenhuma review para este id</p>
                <button
                    onClick={() => handleBackToReview()}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Voltar para a Lista de Reviews
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Editar Review</h2>

            <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mb-4"
                onClick={() => handleBackToReview()}
            >
                Voltar para a Lista
            </button>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700">Review:</label>
                    <textarea
                        name="review_text"
                        value={review.review_text}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Atualizar Review
                </button>
            </form>
        </div>
    );

}

export default UpdateReviewForm;
