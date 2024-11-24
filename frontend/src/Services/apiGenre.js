import config from './apiConfig';

export const getGenres = async () => {

    try {
        const response = await fetch(`${config.API_URL}/genres/`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getAllGenre.', error);
    }

};

export const getGenreById = async (genreId) => {

    try {
        const response = await fetch(`${config.API_URL}/genres/id/${genreId}`, {
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

export const createGenre = async (genre) => {

    try {
        
        const response = await fetch(`${config.API_URL}/genres`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genre)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o genero');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição createGenre: ', error);
    }

};

export const updateGenre = async (genre) => {

    try {

        const response = await fetch(`${config.API_URL}/genre/id/${genre.genre_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genre)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar o genero');
        }

        return response.json();
        
    } catch (error) {
        console.error('Erro na requisição updateGenre: ', error);
    }
};

export const deleteGenre = async (genreId) => {

    try {

        const response = await fetch(`${config.API_URL}/genre/id/${genreId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar o autor');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição deleteGenre: ', error);
    }

};
