import React from 'react';
import estilos from './BarraNavegacao.module.css'
import { Link, useNavigate } from 'react-router-dom'

export function BarraNavegacao() {
  const navigate = useNavigate();

  // Função para fazer logout
  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav className={estilos.conteiner}>
      <ul>
        {/* Link para home que é a tela de visualizar produtos */}
        <Link to={`/produtos`} className={estilos.link}>
          <li>Produtos</li>
        </Link>

        {/* Link para Movimentações */}
        <Link to={`movimentacoes`} className={estilos.link}>
          <li>Movimentações</li>
        </Link>

        {/* Botão de Logout */}
        <li onClick={() => handleLogout()} className={estilos.linkLogout}>
          
        </li>
      </ul>
    </nav>
  );
}