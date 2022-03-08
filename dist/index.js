"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("./usuarios"));
const recados_1 = __importDefault(require("./recados"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
//Listar usuários e IDs (sem a senha)
app.get('/listar-usuarios-id', (request, response) => {
    return response.json(cadastroPessoas.map(usuarios => {
        return {
            nome: usuarios.nome,
            id: usuarios.id
        };
    }));
});
//Listar um usuário pelo ID (com seus recados)
app.get('/buscar-usuario/:id', buscarUsuario, (request, response) => {
    return response.json(request.usuario);
});
function buscarUsuario(request, response, next) {
    const { id } = request.params;
    const usuario = cadastroPessoas.find((search) => search.id === parseInt(id));
    if (!usuario) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado com este ID'
        });
    }
    request.usuario = usuario;
    next();
}
//Cadastrar usuários
const cadastroPessoas = [];
app.post('/cadastro', verificacaoUsuario, (request, response) => {
    return response.status(201).json({
        mensagem: 'Cadastrado com sucesso'
    });
});
function verificacaoUsuario(request, response, next) {
    const { nome, senha } = request.body;
    const usuario = new usuarios_1.default(nome, senha);
    if (cadastroPessoas.find(pessoa => pessoa.nome === nome)) {
        return response.status(400).json({
            mensagem: 'Usuário já cadastrado'
        });
    }
    if (!nome || !senha) {
        return response.status(400).json({
            mensagem: 'Você precisa digitar um nome E uma senha'
        });
    }
    cadastroPessoas.push(usuario);
    next();
}
//Logar
app.get('/logar/:nome/:senha', buscarLoginESenha, (request, response) => {
    return response.status(200);
});
function buscarLoginESenha(request, response, next) {
    const { nome, senha } = request.params;
    const usuario = cadastroPessoas.find(name => name.nome === nome);
    if (usuario) {
        const pw = usuario.senha === senha;
        if (pw) {
            response.status(200).json({
                mensagem: 'Usuário encontrado e logado'
            });
            next();
        }
        else {
            return response.status(404).json({
                mensagem: 'Password incorreto'
            });
        }
    }
    else {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }
}
//Adicionar recados
app.post('/cadastro/:id/adicionar-recados', buscarUsuarioId, (request, response) => {
    const { id } = request.params;
    const { prioridade, recado } = request.body;
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id));
    const recadoUsuario = new recados_1.default(prioridade, recado);
    cadastroPessoas[idUsuario].recados.push(recadoUsuario);
    return response.json({
        mensagem: 'Recado Adicionado'
    });
});
function buscarUsuarioId(request, response, next) {
    const { id } = request.params;
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id));
    if (idUsuario < 0) {
        return response.status(404).json({
            mensagem: 'Usuário inválido'
        });
    }
    next();
}
//Editar recados
app.put('/lista-recados/:nome/:senha/:idRecado', (request, response) => {
    const { nome, senha, idRecado } = request.params;
    const usuario = cadastroPessoas.find(name => name.nome === nome);
    if (usuario) {
        const pw = usuario.senha === senha;
        if (pw) {
            const buscaRecado = usuario.recados.find(recado => recado.id === parseInt(idRecado));
            if (buscaRecado) {
                return response.status(200).json(buscaRecado);
            }
        }
        else {
            return response.status(404).json({
                mensagem: 'Password incorreto'
            });
        }
    }
    else {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }
});
//Deletar recados
app.delete('/cadastro/:id/remover-recados/:idRecado', (request, response) => {
    const { id, idRecado } = request.params;
    const idUsuario = cadastroPessoas.findIndex((iduser) => iduser.id === parseInt(id));
    if (idUsuario < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }
    const indexRecado = cadastroPessoas[idUsuario].recados.findIndex(recado => recado.id === parseInt(idRecado));
    if (indexRecado < 0) {
        return response.status(404).json({
            mensagem: 'Não existe recado com este id'
        });
    }
    cadastroPessoas[idUsuario].recados.splice(indexRecado, 1);
    return response.sendStatus(204);
});
app.listen(8080, () => console.log('Api em funcionamento...'));
