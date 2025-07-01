// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LivroFormPage from './pages/LivroFormPage';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>📚 Cadastro de Livros</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adicionar" element={<LivroFormPage />} />
        <Route path="/editar/:id" element={<LivroFormPage />} />
      </Routes>
    </div>
  );
}

export default App;