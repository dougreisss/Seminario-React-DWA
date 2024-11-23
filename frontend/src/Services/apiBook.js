import config from './apiConfig';

export const getBooks = async () => {
    try {
        const response = await fetch(`${config.API_URL}/book/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao recuperar os livros: ', error);
    }
};

export const getBookById = async (bookId) => {
    try {
        const response = await fetch(`${config.API_URL}/book/id/${bookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao recuperar o livro pelo id: ", error);
    }   
};

export const createBook = async (bookData) => {
    const response = await fetch(`${config.API_URL}/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar o livro');
    }

    return response.json();
};

export const updateBook = async (bookData) => {

    const formatDateForSQL = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; 
    };

    bookData.publication_date = formatDateForSQL(bookData.publication_date);
    bookData.created_at = formatDateForSQL(bookData.created_at);

    const response = await fetch(`${config.API_URL}/book/id/${bookData.book_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar o livro');
    }

    return response.json();
};

export const deleteBook = async (bookId) => {
    try {
        
        const response = await fetch(`${config.API_URL}/book/id/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar o livro');
        }

        return await response.json();

    } catch (error) {
        console.error('Erro na requisição DELETE.', error);
    }
};

