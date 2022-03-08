"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Recado {
    constructor(prioridade, recado) {
        this.prioridade = prioridade;
        this.recado = recado;
        this.id = Math.floor(Math.random() * 100);
    }
}
exports.default = Recado;
