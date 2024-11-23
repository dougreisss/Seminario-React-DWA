const urlApi = 'http://localhost:5000/api'

export const getBooks = async () => {
    try {
        const response = await fetch(`${urlApi}/book/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao recuperar os livros: ', error);
    }
};

export const createBook = async (bookData) => {
    const response = await fetch('/api/book', {
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

export const deleteBook = async (bookId) => {
    try {
        
        const response = await fetch(`/api/book/id/${bookId}`, {
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

export const getAuthors = async () => {

    try {
        const response = await fetch(`${urlApi}/author/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getAuthors.', error)
    }

};