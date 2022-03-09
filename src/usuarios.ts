import Recado from "./recados";

export default class Usuario {
    id: number;
    recados: Recado[] = []
    constructor (public nome: string,
                public senha: string) {
        this.id = Math.floor(Math.random() * 100);
                }
};