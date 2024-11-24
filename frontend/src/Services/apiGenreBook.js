import config from './apiConfig';

export const getGenreByBookId = async (bookId) => {

    try {

        const response = await fetch(`${config.API_URL}/bookGenre/id/${bookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getAuthorById: ', error);
    }

};

export const createBookGenre = async (genreBook) => {

    try {

        const response = await fetch(`${config.API_URL}/bookGenre`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genreBook)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o genero do livro');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição createBookGenre: ', error);
    }

};

export const deleteBookGenre = async (genreBook) => {

    try {

        const response = await fetch(`${config.API_URL}/bookGenre/delete/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genreBook)
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar o autor');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição deleteGenre: ', error);
    }

};