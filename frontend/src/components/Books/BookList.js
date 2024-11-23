import '../../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import { getBooks, deleteBook } from '../../Services/apiBook';

Modal.setAppElement('#root');  // Importante para acessibilidade

function BookList() {
    
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do modal
    const [bookToDelete, setBookToDelete] = useState(null); // Armazena o livro a ser deletado
    const navigate = useNavigate(); // Hook para redirecionar

    const handleUpdateClick = (book) => {
        navigate(`/books/update/${book.book_id}`); // Redireciona para a página de atualização
    };

    const handleCreateClick = () => {
        navigate('/books/create')
    }

    // Carregar os livros quando o componente é montado
    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data); // Atualiza a lista de livros com a resposta da API
        };
        fetchBooks();
    }, []);

    // Função para buscar todos os livros da API
    const fetchBooks = async () => {
        const data = await getBooks();
        setBooks(data); // Atualiza o estado com todos os livros
    };

    // Função para deletar um livro
    const handleDeleteBook = async () => {
        if (!bookToDelete) return; // Se não houver livro selecionado, não faz nada

        try {
            await deleteBook(bookToDelete.book_id); // Deleta o livro
            fetchBooks(); // Chama novamente a api para recarregar a lista de livros
            setIsModalOpen(false); // Fecha o modal após a exclusão
            setBookToDelete(null); // Limpa a referência ao livro deletado
        } catch (error) {
            console.error('Erro ao deletar livro:', error.message);
        }
    };
   
    // Função para abrir o modal de confirmação
    const openModal = (book) => {
        setBookToDelete(book); // Define o livro a ser deletado
        setIsModalOpen(true); // Abre o modal
    };

    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false); // Fecha o modal
        setBookToDelete(null); // Limpa a referência ao livro
    };

    // if (!books) { return () }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Lista de Livros</h2>
            <div>
                {/* <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
                    onClick={() => handleCreateClick()}
                >
                    Adicionar Novo Livro
                </button> */}
                
                {/* Verifica se há livros na lista */}
                {books.length === 0 ? (
                    <p className="text-gray-700 text-center mt-8">Não existem livros cadastrados no momento.</p>
                ) : (
                    <ul className="space-y-4">
                        {books.map((book) => (
                            <li
                                key={book.book_id} // Garante uma chave única para cada item
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <h3 className="text-2xl font-semibold text-gray-900">{book.title}</h3>
                                <p className="text-gray-700 mb-4">{book.synopsis}</p>
                                <div className="flex space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleUpdateClick(book)}
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => openModal(book)} // Abre o modal passando o livro
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
                <h2 className="text-xl font-semibold text-gray-800">Tem certeza que deseja excluir este livro?</h2>
                <p className="text-gray-600 mb-4">{bookToDelete?.title}</p>
                <div className="flex gap-4 justify-between">
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDeleteBook}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Deletar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default BookList;
