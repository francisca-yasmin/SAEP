import axios from "axios"; // Para fazer as requisições à API
import React, { useState, useEffect } from 'react';
import add from '../assets/images/add.png';
import canetinha from '../assets/images/canetinha.png';
import del from '../assets/images/del.png';
import estilos from './Visualizar.module.css';
import { Link } from "react-router-dom";

export function Produto() {
    const [produtos, setProdutos] = useState([]); // Variável para armazenar os produtos
    const [usuarios, setUsuarios] = useState([]); // Pode ser utilizado se o usuario estiver relacionado a algum produto

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        // Busca os produtos
        axios.get('http://127.0.0.1:8000/produtos/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setProdutos(response.data);  // Atualiza a lista de produtos com os dados da API
            console.log("Produtos recebidos:", response.data);

        })
        .catch(error => {
            console.error("Erro ao buscar produtos:", error);
        });

        // Caso o professor seja necessário (pode ser removido se não for usado)
        axios.get('http://127.0.0.1:8000/usuarios/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const usuarioPorId = {};
            response.data.forEach(prof => {
                usuarioPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
            });
            setUsuarios(usuarioPorId);  // Armazena os professores por ID
        })
        .catch(error => {
            console.error("Erro ao buscar usuário:", error);
        });
    }, []);

    // Função para excluir um produto
    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este produto?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/produtos/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Produto excluído com sucesso!');
            setProdutos(prev => prev.filter(produto => produto.id !== id));  // Remove o produto da lista
        })
        .catch(error => {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir o produto.');
        });
    };

    return (
        <main className={estilos.container}>
            <h3 className={estilos.titulo}>Produtos</h3>
            <div className={estilos.topoAcoes}>
                {/* Botão de adicionar produto */}
                <Link to="/produtos/cadprodutos">
                    <img className={estilos.iconeAdd} src={add} alt="Adicionar produto" />
                </Link>
            </div>

            <div className={estilos.tableWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Quantidade Atual</th>
                            <th>Estoque Mínimo</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos && produtos.length > 0 ? (
                            produtos.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.atual_produto}</td>
                                    <td>{produto.min_estoque}</td>

                                    <td className={estilos.acoes}>
                                        {/* Link para editar o produto */}
                                        <Link to={`/produtos/editarp/${produto.id_produto}`}>
                                        <img src={canetinha} className={estilos.icone} alt="Editar" />
                                        </Link>
                                        {/* Botão de excluir */}
                                        <img 
                                            src={del} 
                                            alt="Excluir" 
                                            className={estilos.icone} 
                                            onClick={() => handleDelete(produto.id_produto)} 
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhum produto encontrado</td>
                            </tr>
                        )}      
                    </tbody>

                </table>
            </div>
        </main>
    );
}
