"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.senha = senha;
        this.recados = [];
        this.id = Math.floor(Math.random() * 100);
    }
}
exports.default = Usuario;
;
