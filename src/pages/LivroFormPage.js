// src/pages/LivroFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hooks para pegar o ID da URL e para navegar
import axios from 'axios';
import LivroForm from '../components/LivroForm';

const API_URL = 'http://127.0.0.1:8000/api/livros';

function LivroFormPage() {
    const [livro, setLivro] = useState(null);
    const { id } = useParams(); // Pega o 'id' da URL, ex: /editar/1
    const navigate = useNavigate(); // Hook para nos permitir redirecionar o usuário

    useEffect(() => {
        // Se existe um 'id' na URL, estamos em modo de edição.
        if (id) {
            axios.get(`${API_URL}/${id}`)
                .then(response => setLivro(response.data))
                .catch(error => console.error('Erro ao buscar livro para edição:', error));
        }
        // Se não há 'id', o 'livro' continua null, e o formulário ficará em branco para criação.
    }, [id]);

    const handleSave = async (livroParaSalvar) => {
        try {
            if (id) { // Se tem id, atualiza (PUT)
                await axios.put(`${API_URL}/${id}`, livroParaSalvar);
            } else { // Se não, cria (POST)
                await axios.post(API_URL, livroParaSalvar);
            }
            navigate('/'); // Após salvar, volta para a página inicial (lista de livros)
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                alert(`Erro de validação:\n${errorMessages}`);
            } else {
                console.error('Erro ao salvar livro:', error.message);
                alert('Ocorreu um erro ao salvar o livro.');
            }
        }
    };

    const handleCancel = () => {
        navigate('/'); // Se cancelar, volta para a página inicial
    };

    // Não renderiza o formulário até que o livro a ser editado seja carregado
    if (id && !livro) {
        return <div>Carregando...</div>;
    }

    return (
        <LivroForm livroAtual={livro} onSave={handleSave} onCancel={handleCancel} />
    );
}

export default LivroFormPage;