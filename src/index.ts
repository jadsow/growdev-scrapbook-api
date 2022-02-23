import express, {Request, response, Response} from 'express';
import cors from 'cors';
import Usuario from './usuarios'
import Recados from './recados'
import { request } from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//Listar usuários e IDs
app.get('/listar-usuarios-id', (request: Request, response: Response) => {
    const nomeDosUsuarios = []

    for (let nomeUsuarios of cadastroPessoas){
        nomeDosUsuarios.push(nomeUsuarios.nome)
        nomeDosUsuarios.push(nomeUsuarios.id)
    }

    return response.status(200).json(nomeDosUsuarios)
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



app.listen(8080, () => console.log('Api em funcionamento...'))
