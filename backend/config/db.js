const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    port: 56291,
    user: 'root',
    password: 'nYnozoLIzLMwRLyzBTTBIhnAGwCYBewz',
    database: 'railway'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
}); 

module.exports = db;