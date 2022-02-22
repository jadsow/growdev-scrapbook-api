import express, {Request, Response} from 'express';
import cors from 'cors';
import Usuario from './usuarios'
import { request } from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/listar-usuarios', (request: Request, response: Response) => {
    return response.json(cadastroPessoas)
})

//Cadastrar usuários
const cadastroPessoas: Usuario[] = [];

app.post('/cadastro', (request: Request, response: Response) => {
    const {nome, senha} = request.body;
    const usuario = new Usuario (nome, senha);

    cadastroPessoas.push(usuario);

    return response.status(201).json(usuario)
})

app.listen(8080, () => console.log('Api em funcionamento...'))
