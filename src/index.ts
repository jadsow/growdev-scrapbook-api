import express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const cadastroPessoas: any = [];

app.get('/listar-usuarios', (request: Request, response: Response) => {
    const {listaUsuarios} = request.query;

    return response.json(cadastroPessoas)
})

app.post('/cadastro', (request: Request, response: Response) => {
    const {nome, senha} = request.body;
    const pessoa = {
        nome,
        senha,
    }
    
    cadastroPessoas.push(pessoa);

    return response.status(201).json(pessoa)
})

function usuarioExiste (request: Request, response: Response, next: any) {
    const consulta = cadastroPessoas.find((f:any) => f.nome);

    if (request.body.nome === consulta.nome){
        console.log('nome existente, escolha outro');
        next()
    } else {
        console.log('usuário não registrado');
        next()
    }
}



app.listen(8080, () => console.log('Api em funcionamento...'))
