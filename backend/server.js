const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

app.use(cors());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

app.use('/api/book', bookRoutes);
app.use('/api/author', authorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
