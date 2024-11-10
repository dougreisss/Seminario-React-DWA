import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchMessage } from './api';

function App() {

  const [message, setMessage] = useState([]);

  useEffect(() => {
    const getMessage = async () => {
      const msg = await fetchMessage();
      setMessage(msg);
    };

    getMessage();
  }, []);

  return (
    <div className='App'>
      <h1>Lista de Livros</h1>
      <ul>
        {message.map(book => (
          <li key={book.book_id}>
            <h2>{book.title}</h2>
            <p>Autor: {book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
