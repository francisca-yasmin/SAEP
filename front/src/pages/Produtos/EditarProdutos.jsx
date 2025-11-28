import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './Editar.module.css';

// Esquema de validação com Zod
const schemaEditarProduto = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')  // Valida o tamanho mínimo do nome
    .max(100, 'Nome deve ter no máximo 100 caracteres'),  // Valida o tamanho máximo do nome
  
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
  // Valida que o estoque atual não pode ser menor que o estoque mínimo
  if (data.atual_produto < data.min_estoque) {
    return false;
  }
  return true;
}, {
  message: 'O número atual de produtos não pode ser menor que o estoque mínimo',
});

export function EditarProduto() {
  const [usuarios, setUsuarios] = useState([]);
  const { id } = useParams(); // Pega o id da URL
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaEditarProduto),
  });

  // UseEffect para carregar os dados ao editar
  useEffect(() => {
    async function buscarDados() {
      try {
        const token = localStorage.getItem('access_token');
        
        
        // Busca os usuarios
        const responseUsuarios = await axios.get('http://127.0.0.1:8000/usuarios/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsuarios(responseUsuarios.data);
        // console.log("UUUUUUUUUUUU", responseUsuarios.data[0].id);
        // Busca os dados do produto com base no ID
        const responseProduto = await axios.get(`http://127.0.0.1:8000/produtos/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Preenche o formulário com os dados do produto
        reset(responseProduto.data);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    }

    buscarDados();
  }, [id, reset]);

  // Função para editar o produto
  async function obterDadosFormulario(data) {
    console.log("Dados do formulário:", data);
    try {
      const token = localStorage.getItem('access_token');

      const response = await axios.put(
        `http://127.0.0.1:8000/produtos/${id}/`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Produto editado com sucesso!', response.data);
      alert('Produto editado com sucesso!');
      reset();
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao editar produto', error);
      alert("Erro ao editar produto");
    }
  }

  return (
    <div className={estilos.conteiner}>
      <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
        <h2 className={estilos.titulo}>Editar Produto</h2>

        {/* Nome do Produto */}
        <div className={estilos.campo}>
          <input
            className={estilos.inputField}
            {...register('nome')}
            placeholder="Nome do Produto"
          />
        </div>
        {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}

        {/* Estoque Atual */}
        <div className={estilos.campo}>
          <input
            type="number"
            className={estilos.inputField}
            {...register('atual_produto', { valueAsNumber: true })}
            placeholder="Estoque Atual"
          />
        </div>
        {errors.atual_produto && <p className={estilos.error}>{errors.atual_produto.message}</p>}

        {/* Descrição do Produto */}
        <div className={estilos.campo}>
          <textarea
            className={estilos.inputField}
            {...register('descricao')}
            placeholder="Descrição do Produto"
            rows={5}
          />
        </div>
        {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}

        {/* Estoque Mínimo */}
        <div className={estilos.campo}>
          <input
            type="number"
            className={estilos.inputField}
            {...register('min_estoque', { valueAsNumber: true })}
            placeholder="Estoque Mínimo"
          />
        </div>
        {errors.min_estoque && <p className={estilos.error}>{errors.min_estoque.message}</p>}

        {/* Botão de Submeter */}
        <div className={estilos.icones}>
          <button className={estilos.submitButton} type="submit">
            Editar
          </button>
        </div>
      </form>
    </div>
  );
}