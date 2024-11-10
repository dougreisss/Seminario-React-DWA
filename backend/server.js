const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

const bookRoutes = require('./routes/bookRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/book', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
