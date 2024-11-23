import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import BookList from './components/Books/BookList';
import UpdateBookForm from './components/Books/UpdateBookForm'; 
import CreateBookForm from './components/Books/CreateBookForm'; 
import About from './components/About/About';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Menu */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/books">Book Manager</Link>
            </h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/books" className="hover:underline">
                  Livros
                </Link>
              </li>
              <li>
                <Link to="/books/create/" className="hover:underline">
                  Adicionar Livro
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                    Sobre
                  </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Redireciona qualquer caminho vazio para /books */}
            <Route path="/" element={<Navigate to="/books" replace />} />

            {/* Rota principal da lista de livros */}
            <Route path="/books/" element={<BookList />} />

            {/* Rota para edição de livros */}
            <Route path="/books/update/:id" element={<UpdateBookForm />} />

            {/* Rota para criação de livros */}
            <Route path="/books/create/" element={<CreateBookForm />} />

            {/* Rota para página sobre (desenvolvido por) */}
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </main>

        {/* Rodapé */}
        <footer className="bg-gray-800 text-gray-300 p-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Book Manager - Gerencie seus livros e avaliações com facilidade.</p>
          </div>
        </footer>
      </div>
    </Router>
  );

}

export default App;
