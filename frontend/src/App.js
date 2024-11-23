import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/Books/BookList';
import UpdateBookForm from './components/Books/UpdateBookForm'; 
import CreateBookForm from './components/Books/CreateBookForm'; 

function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books/" element={<BookList />} />
          <Route path="/books/update/:id" element={<UpdateBookForm />} />
          <Route path="/books/create/" element={<CreateBookForm />} />
      </Routes>
    </Router>
  );

}

export default App;
