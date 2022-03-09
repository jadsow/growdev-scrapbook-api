import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import Usuario from './usuarios'
import Recado from './recados'
import { request } from 'http';
import { json } from 'stream/consumers';
import { nextTick } from 'process';

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

//Listar um usuário pelo ID (com seus recados)
app.get('/buscar-usuario/:id', buscarUsuario, (request: any, response: Response) => {

    return response.json(request.usuario)
})

function buscarUsuario (request: any, response: Response, next: NextFunction) {
    const {id} = request.params;
    const usuario = cadastroPessoas.find((search) => search.id === parseInt(id))

    if (!usuario) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado com este ID'
        })
    }
    request.usuario = usuario
    next()
}

//Cadastrar usuários
const cadastroPessoas: Usuario[] = [];
app.post('/cadastro', (request: Request, response: Response) => {
    const {nome, senha} = request.body;
    const usuario = new Usuario (nome, senha);

    if (cadastroPessoas.find(pessoa => pessoa.nome === nome)){
        return response.json({
            mensagem: 'Usuário já cadastrado'
        })
    }

    cadastroPessoas.push(usuario);

    return response.status(201).json({
        mensagem: 'Cadastrado com sucesso'
    })
})

//Logar
app.post('/logar', (request: Request, response: Response) => {
    const {nome, senha} = request.body;
    const usuario = cadastroPessoas.find(name => name.nome === nome)

    if (usuario) {
        const pw = usuario.senha === senha;
        if (pw){
                response.status(200).json({
                mensagem: 'Usuário encontrado e logado'
            })
        } else {
            return response.status(404).json({
                mensagem: 'Password incorreto'
            })
        }
    } else {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        })
        
    }
    return response.sendStatus(200);
})

//Adicionar recados
app.post ('/cadastro/:id/adicionar-recados', buscarUsuarioId, (request: Request, response: Response) => {
    const {id} = request.params;
    const {prioridade, recado} = request.body
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id))

    const recadoUsuario = new Recado (prioridade, recado);
    cadastroPessoas[idUsuario].recados.push(recadoUsuario)

    return response.json({
        mensagem: 'Recado Adicionado'
    })
})

function buscarUsuarioId (request: any, response: Response, next: NextFunction) {
    const {id} = request.params;
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id))

        if (idUsuario < 0){
            return response.status(404).json({
                mensagem: 'Usuário inválido'
            })
        }

    next()
}

//Editar recados
app.put ('/lista-recados/:nome/:senha/:idRecado', (request: Request, response: Response) => {
    const {nome, senha, idRecado} = request.params;

    const usuario = cadastroPessoas.find(name => name.nome === nome)

    if (usuario) {

        const pw = usuario.senha === senha;
        if (pw){            
            const buscaRecado = usuario.recados.find(recado => recado.id === parseInt(idRecado))
            if (buscaRecado) {
                return response.status(200).json(buscaRecado)
            }
        } else {
            return response.status(404).json({
                mensagem: 'Password incorreto'
            })
        }
        } else {
            return response.status(404).json({
                mensagem: 'Usuário não encontrado'
            })
        }
})

//Deletar recados
app.delete('/cadastro/:id/remover-recados/:idRecado', (request: Request, response: Response) => {
    const {id, idRecado} = request.params;
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id))

    if (idUsuario < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        })
    }

    const indexRecado = cadastroPessoas[idUsuario].recados.findIndex(recado => recado.id === parseInt(idRecado));

    if (indexRecado < 0) {
        return response.status(404).json({
            mensagem: 'Não existe recado com este id'
        })
    }

    cadastroPessoas[idUsuario].recados.splice(indexRecado, 1)

    return response.sendStatus(204)

})

app.listen(process.env.PORT || 8080, () => console.log('Api em funcionamento...'))
