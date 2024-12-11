import config from './apiConfig';

export const getReview = async () => {

    try {
        const response = await fetch(`${config.API_URL}/review/`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getReview.', error)
    }

};

export const getReviewById = async (reviewId) => {

    try {
        const response = await fetch(`${config.API_URL}/review/id/${reviewId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição getReviewById: ', error)
    }

};

export const createReview = async (review) => {

    try {
        const response = await fetch(`${config.API_URL}/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar a review');
        }

        return response.json();
    } catch (error) {
        console.error('Erro na requisição createReview: ', error)
    }

};

export const updateReview = async (review) => {

    try {

        const response = await fetch(`${config.API_URL}/review/id/${review.review_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar a review');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição updateReview: ', error)
    }

};

export const deleteReview = async (reviewId) => {

    try {

        const response = await fetch(`${config.API_URL}/review/id/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar a review');
        }

        return response.json();

    } catch (error) {
        console.error('Erro na requisição deleteReview: ', error)
    }

};