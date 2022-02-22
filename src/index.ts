import express, {Request, Response} from 'express';
import cors from 'cors';
import { request } from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const cadastroPessoas: any = [];

app.get('/listar-usuarios', (request: Request, response: Response) => {
    return response.json(cadastroPessoas)
})

app.get('/listar-recados', (request:Request, response: Response) => {
    return response.json(listaDeRecados)
})

app.post('/cadastro', (request: Request, response: Response) => {
    const {nome, senha} = request.body;
    const pessoa = 
        {
            nome,
            senha,
        }
       
    cadastroPessoas.push(pessoa);
    return response.status(201).json(pessoa)
})

const listaDeRecados: any = []

app.post('/listar-recado', (request: Request, response: Response) => {
    const {prioridade, recado} = request.body

    const recados = {
        prioridade,
        recado,
    }

    listaDeRecados.push(recados)
    return response.status(200).json({
        mensagem: 'Recado foi registrado'
    })

})


app.listen(8080, () => console.log('Api em funcionamento...'))
