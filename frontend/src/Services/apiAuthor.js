import config from './apiConfig';

export const getAuthors = async () => {

    try {
        const response = await fetch(`${config.API_URL}/author/`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getAuthors.', error)
    }

};

export const getAuthorById = async (authorId) => {

    try {
        const response = await fetch(`${config.API_URL}/author/id/${authorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getAuthorById: ', error)
    }

};

export const createAuthor = async (author) => {

    try {
        const response = await fetch(`${config.API_URL}/author/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(author)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o autor');
        }

        return response.json();
    } catch (error) {
        console.error('Erro na requisição createAuthor: ', error)
    }

};

export const updateAuthor = async (author) => {

    try {
        
        const response = await fetch(`${config.API_URL}/author/id/${author.author_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(author)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o autor');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição updateAuthor: ', error)
    }

};

export const deleteAuthor = async (authorId) => {

    try {
        
        const response = await fetch(`${config.API_URL}/author/id/${authorId}`, {
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
        console.error('Erro na requisição deleteAuthor: ', error)
    }

};