// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LivroList from '../components/LivroList';

const API_URL = 'http://127.0.0.1:8000/api/livros';

function HomePage() {
    // Garantimos que o estado inicial é SEMPRE uma lista vazia [].
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        fetchLivros();
    }, []);

    const fetchLivros = async () => {
        try {
            const response = await axios.get(API_URL);
            setLivros(response.data); // Define os livros com os dados da API
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
            alert('Não foi possível buscar os livros. Verifique a consola para erros (F12).');
            setLivros([]); // Em caso de erro, garante que a lista fica vazia.
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este livro?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchLivros();
            } catch (error) {
                console.error('Erro ao deletar livro:', error);
                alert('Ocorreu um erro ao deletar o livro.');
            }
        }
    };

    return (
        <>
            <Link to="/adicionar" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
                Adicionar Novo Livro
            </Link>
            <LivroList livros={livros} onDelete={handleDelete} />
        </>
    );
}

export default HomePage;