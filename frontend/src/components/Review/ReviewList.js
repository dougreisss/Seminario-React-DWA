import '../../App.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import { getReview, deleteReview } from '../../Services/apiReview';

function ReviewList() {

    const [reviews, setReview] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do modal
    const [reviewToDelete, setReviewToDelete] = useState(null); 
    const navigate = useNavigate(); // Hook para redirecionar

    const fetchReview = async () => {
        const data = await getReview();
        setReview(data); 
    };

    useEffect(() => {
        fetchReview();
    }, []);

    const handleDeleteReview = async () => {
        if (!reviewToDelete) return; 

        try {
            await deleteReview(reviewToDelete.review_id);
            fetchReview(); 
            setIsModalOpen(false); 
            setReviewToDelete(null); 
        } catch (error) {
            console.error('Erro ao deletar livro:', error.message);
        }
    };

    const handleUpdateClick = (review_id) => {
        navigate(`/review/update/${review_id}`); // Redireciona para a página de atualização
    };

    // Função para abrir o modal de confirmação
    const openModal = (book) => {
        setReviewToDelete(book); 
        setIsModalOpen(true); // Abre o modal
    };

    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false); // Fecha o modal
        setReviewToDelete(null); 
    };

    return (

        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Lista de Review</h2>
            <div>
                {reviews.length === 0 ? (
                    <p className="text-gray-700 text-center mt-8">Não existem review cadastrados no momento.</p>
                ) : (
                    <ul className="space-y-4">
                        {reviews.map((review) => (
                            <li
                                key={review.review_id} // Garante uma chave única para cada item
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <h3 className="text-2xl font-semibold text-gray-900">{review.title}</h3>
                                <p className="text-gray-700 mb-4">Review: {review.review_text}</p>
                                <div className="flex space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleUpdateClick(review.review_id)}
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => openModal(review)} // Abre o modal passando o livro
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Modal
                isOpen={isModalOpen} // Controla se o modal está aberto
                onRequestClose={closeModal} // Função para fechar o modal
                contentLabel="Confirmação de Exclusão"
                className="modal" // Classe para o estilo do modal 
                overlayClassName="overlay" // Classe para o overlay 
            >
                <h2 className="text-xl font-semibold text-gray-800">Tem certeza que deseja excluir esta review?</h2>
                <p className="text-gray-600 mb-4">{reviewToDelete?.title}</p>
                <div className="flex gap-4 justify-between">
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDeleteReview}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Deletar
                    </button>
                </div>
            </Modal>

        </div>
    )
}

export default ReviewList;
