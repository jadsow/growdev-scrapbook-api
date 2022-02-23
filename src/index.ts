import express, {Request, response, Response} from 'express';
import cors from 'cors';
import Usuario from './usuarios'
import Recado from './recados'
import { request } from 'http';
import { json } from 'stream/consumers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//Listar usuários e IDs (sem a senha)
app.get('/listar-usuarios-id', (request: Request, response: Response) => {
    return response.json(cadastroPessoas.map(usuarios => {
        return {
            nome: usuarios.nome,
            id: usuarios.id
        }
    }))
})

//Listar um usuário pelo ID
app.get('/buscar-usuario/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    const buscarUsuario = cadastroPessoas.find((search) => search.id === parseInt(id))

    if (!buscarUsuario) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado com este ID'
        })
    }
    return response.status(200).json(buscarUsuario)
})

//Cadastrar usuários
const cadastroPessoas: Usuario[] = [];
app.post('/cadastro', (request: Request, response: Response) => {
    const {nome, senha} = request.body;
    const usuario = new Usuario (nome, senha);

    if (cadastroPessoas.find(pessoa => pessoa.nome === nome)){
        return response.status(400).json({
            mensagem: 'Usuário já cadastrado'
        })
    }

    if (!nome || !senha){
        return response.status(400).json({
            mensagem: 'Você precisa digitar um nome E uma senha'
        })
    }

    cadastroPessoas.push(usuario);

    return response.status(201).json({
        mensagem: 'Cadastrado com sucesso'
    })
})

//Deletar usuário pelo ID
app.delete ('/deletar-usuario/:id', (request: Request, response: Response) => {
    const {id} = request.params
    const buscarIndexUsuario = cadastroPessoas.findIndex((search) => search.id === parseInt(id))

    if (buscarIndexUsuario < 0){
        return response.json({
            mensagem: 'Usuário não encontrado'
        })
    } 
    
    cadastroPessoas.splice(buscarIndexUsuario, 1)

    return response.sendStatus(204)
    

})

//Adicionar recados
app.post ('/cadastro/:id/adicionar-recados', (request: Request, response: Response) => {
    const {id} = request.params;
    const {prioridade, recado} = request.body
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id))
    
    if (idUsuario < 0){
        return response.status(404).json({
            mensagem: 'Usuário inválido'
        })
    }

    const recadoUsuario = new Recado (prioridade, recado);
    cadastroPessoas[idUsuario].recados.push(recadoUsuario)
    
    return response.json(recadoUsuario)
})

app.listen(8080, () => console.log('Api em funcionamento...'))
