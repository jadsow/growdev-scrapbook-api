import Recados from "./recados";

export default class Usuario {
    id: number;
    recados: Recados[] = []
    constructor (public nome: string,
                private senha: string) {
        this.id = Math.floor(Math.random() * 100);
                }
};