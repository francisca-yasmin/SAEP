import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login'; 
import { Produto } from '../pages/Produto';

import { ProdutoCadastrar } from '../pages/Produtos/CadastrarProdutos';
import { EditarProduto } from '../pages/Produtos/EditarProdutos';

import { BarraNavegacao } from '../components/BarraNavegacao';

export function Rotas() {
    return (
        <>
            <BarraNavegacao />

            <Routes>
                <Route path='/login' element={<Login />} />

                <Route path='/produtos' element={<Produto />} />
                <Route path='/produtos/cadprodutos' element={<ProdutoCadastrar />} />
                <Route path='/produtos/editarp/:id' element={<EditarProduto />} />
            </Routes>
        </>
    );
}
