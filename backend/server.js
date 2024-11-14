const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

const bookRoutes = require('./routes/bookRoutes');

app.use(cors());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
  
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Esta é a rota padrão. <br> Para executar a rota de livro, coloque a seguinte url "/api/book" ');
});

app.use('/api/book', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
