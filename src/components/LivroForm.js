// src/LivroForm.js
import React, { useState, useEffect } from 'react';

function LivroForm({ livroAtual, onSave, onCancel }) {
    // Estado inicial do formulário. Usa o livro atual se estiver editando, ou um objeto vazio se for novo.
    const [livro, setLivro] = useState(
        livroAtual || {
            titulo: '',
            autor: '',
            editora: '',
            ano_publicacao: '',
            numero_paginas: '',
            data_aquisicao: '',
            resumo: '',
        }
    );

    // useEffect para atualizar o formulário se o livro a ser editado mudar.
    useEffect(() => {
        setLivro(
            livroAtual || {
                titulo: '',
                autor: '',
                editora: '',
                ano_publicacao: '',
                numero_paginas: '',
                data_aquisicao: '',
                resumo: '',
            }
        );
    }, [livroAtual]);

    // Função para lidar com mudanças em qualquer campo do input.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivro({ ...livro, [name]: value });
    };

    // Função chamada quando o formulário é enviado.
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página.
        onSave(livro); // Chama a função onSave passada pelo App.js.
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{livro.id ? 'Editar Livro' : 'Adicionar Livro'}</h2>

            <input name="titulo" value={livro.titulo} onChange={handleChange} placeholder="Título" required />
            <input name="autor" value={livro.autor} onChange={handleChange} placeholder="Autor" required />
            <input name="editora" value={livro.editora || ''} onChange={handleChange} placeholder="Editora" />
            <input name="ano_publicacao" type="number" value={livro.ano_publicacao} onChange={handleChange} placeholder="Ano de Publicação" required />
            <input name="numero_paginas" type="number" value={livro.numero_paginas} onChange={handleChange} placeholder="Nº de Páginas" required />
            <input name="data_aquisicao" type="date" value={livro.data_aquisicao} onChange={handleChange} required />
            <textarea name="resumo" value={livro.resumo || ''} onChange={handleChange} placeholder="Resumo" />

            <div>
                <button type="submit" className="btn btn-primary">{livro.id ? 'Salvar Alterações' : 'Adicionar Livro'}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
}

export default LivroForm;