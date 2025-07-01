// src/components/LivroList.js
import React from 'react';
import { Link } from 'react-router-dom';

function LivroList({ livros, onDelete }) {
    // ESTA VERIFICAÇÃO IMPEDE O ERRO
    if (!livros || livros.length === 0) {
        return <p>Nenhum livro encontrado ou a carregar... Que tal adicionar um novo?</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Editora</th>
                    <th>Ano</th>
                    <th>Nº de Páginas</th>
                    <th>Data de Aquisição</th>
                    <th>Resumo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {livros.map((livro) => (
                    <tr key={livro.id}>
                        <td>{livro.titulo}</td>
                        <td>{livro.autor}</td>
                        <td>{livro.editora}</td>
                        <td>{livro.ano_publicacao}</td>
                        <td>{livro.numero_paginas}</td>
                        <td>{livro.data_aquisicao ? new Date(livro.data_aquisicao).toLocaleDateString() : ''}</td>
                        <td title={livro.resumo} style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {livro.resumo}
                        </td>
                        <td className="actions">
                            <Link to={`/editar/${livro.id}`} className="btn btn-edit">Editar</Link>
                            <button onClick={() => onDelete(livro.id)} className="btn btn-danger">Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LivroList;