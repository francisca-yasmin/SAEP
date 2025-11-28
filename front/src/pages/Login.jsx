import axios from 'axios'; //requisições http
import { useNavigate } from 'react-router-dom'; //direciona o user para outra página
import estilos from './Login.module.css';
//as 3 bibliotecas faz a validação do form, um depende do outro
import { useForm } from "react-hook-form"; //validação daquilo que foi importado -> antes de mandar pro back
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

 
const schemaLogin = z.object({
    login: z.string()
        .min(1, 'Informe um nome')
        .max(25, 'Informe no máximo 25 caracteres'),
    password: z.string()
        .min(1, 'Informe uma senha')
        .max(15, 'Informe no máximo 15 caracteres')
});
 
export function Login() {
    const navigate = useNavigate(); //quero que seja direcionado para algum lugar
 
    const {
        //registra as (todas) informações que são dadas pelo user e tenta resover de acordo com os schema
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });
 
    async function obterDadosFormulario(data) {
        console.log(`Dados: ${data}`)
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                login: data.login,
                username: data.login,
                password: data.password
            });
 
             //quando eu bater nessa porta, vou querer de retorno essas três respostas
            const { access, refresh, user } = response.data;
 
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('username', user.username); //nome do usuario
 
            console.log('Login bem-sucedido!');          
            navigate('/produtos');
         
 
        } catch (error) {
            console.error('Erro de autenticação', error);
            alert("Dados Inválidos, por favor verifique suas credenciais");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.loginForm}>
                
                <h2 className={estilos.titulo}> Login </h2>

                <div className={estilos.usuario}> 

                    <input className={estilos.inputField}
                        {...register('login')}
                        placeholder='francisca yasmin'
                        />  
                </div>

                    {errors.username && <p className={estilos.error}>{errors.username.message}</p>}
 
                    
                <div className={estilos.usuario} >

                <input
                    {...register('password')}  //registrando a senha do usuário e checando 
                    placeholder='Senha'
                    type="password"
                    className={estilos.inputField}
                    />
                </div>

                {errors.password && <p className={estilos.error}>{errors.password.message}</p>} {/*mensagem de erro caso dê errado a autenticação*/}
                
                <div className={estilos.botao}>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}
 
 