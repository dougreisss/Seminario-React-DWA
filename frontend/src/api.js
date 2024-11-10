const urlApi = 'http://localhost:5000/api/book'

export const fetchMessage = async () => {
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};