const urlApi = 'http://localhost:5000/api'

export const getBooks = async () => {
    try {
        const response = await fetch(`${urlApi}/book/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};