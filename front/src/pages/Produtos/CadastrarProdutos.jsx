// importa bibliotecas e recursos necessários
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import estilos from '../Produtos/Cadastrar.module.css'; 
import { useNavigate } from 'react-router-dom';


// esquema de validação com zod
const schemaProduto = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')  // Valida o tamanho mínimo do nome
    .max(100, 'Nome deve ter no máximo 150 caracteres'),  // Valida o tamanho máximo do nome
  
    atual_produto: z.number({
    invalid_type_error: 'Atual do produto deve ser um número'
  })
    .min(0, 'O valor de estoque não pode ser negativo'),  // Garante que atual_produto não seja negativo
  
    descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')  // Garante que a descrição tenha pelo menos 10 caracteres
    .max(300, 'Descrição deve ter no máximo 300 caracteres'),  // Garante que a descrição tenha no máximo 300 caracteres
  
    min_estoque: z.number({
    invalid_type_error: 'Mínimo de estoque deve ser um número'
  })
    .min(1, 'Mínimo de estoque deve ser maior que 0'),  // Garante que o mínimo de estoque seja maior que 0
}).refine((data) => {
  // Adicionando validação extra, caso queira verificar se o número de estoque é compatível com o produto
  if (data.atual_produto < data.min_estoque) {
    return false;
  }
  return true;
}, {
  message: 'O número atual de produtos não pode ser menor que o estoque mínimo',
});

export function ProdutoCadastrar() {
  const [produtos, setProdutos] = useState([]);  // Pode ser uma lista de produtos se necessário, mas aqui você não precisa carregar nada inicialmente
  const navigate = useNavigate();  // Para redirecionamento

  // Conecta o react-hook-form com o zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaProduto)
  });

  // Envia os dados preenchidos para a API
  async function obterDadosFormulario(data) {
    console.log("Dados do formulario", data);

    try {
      console.log("Dados enviados:", data);
      const token = localStorage.getItem('access_token');

      await axios.post('http://127.0.0.1:8000/produtos/', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert("Produto cadastrado com sucesso!");
      reset();  // Limpa os campos
      navigate('/produtos');  // Redireciona

    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar produto.");
    }
  }

  return (
    <div className={estilos.conteiner}>
      <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
        <h2 className={estilos.titulo}>Cadastro de Produto</h2>

        {/* Nome */}
        <div className={estilos.campo}>
          <label className={estilos.icone}>Nome do Produto</label>
          <input className={estilos.inputField} {...register('nome')} />
        </div>
        {errors.nome && <p className={estilos.error}>{errors.nome?.message}</p>}

        {/* Quantidade atual */}
        <div className={estilos.campo}>
          <label className={estilos.icone}>Quantidade Atual (estoque)</label>
          <input className={estilos.inputField} type="number" {...register('atual_produto')} />
        </div>
        {errors.atual_produto && <p className={estilos.error}>{errors.atual_produto?.message}</p>}

        {/* Descrição */}
        <div className={estilos.campo}>
          <label className={estilos.icone}>Descrição do Produto</label>
          <textarea className={estilos.inputField} {...register('descricao')} />
        </div>
        {errors.descricao && <p className={estilos.error}>{errors.descricao?.message}</p>}

        {/* Estoque mínimo */}
        <div className={estilos.campo}>
          <label className={estilos.icone}>Estoque Mínimo</label>
          <input className={estilos.inputField} type="number" {...register('min_estoque')} />
        </div>
        {errors.min_estoque && <p className={estilos.error}>{errors.min_estoque?.message}</p>}

        {/* Botão de submit */}
        {errors?.root && (<p className={estilos.error}>{errors.root.message}</p>)}
        <div>
          <button className={estilos.submitButton} type="submit">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}