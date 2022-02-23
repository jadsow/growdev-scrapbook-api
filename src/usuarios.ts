export default class Usuario {
    id: number;
    constructor (public nome: string,
                private senha: string) {
        this.id = Math.floor(Math.random() * 100);
                }
};