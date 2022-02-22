export default class Usuario {
    id: number;
    constructor (public name: string,
                private senha: string) {
        this.id = Math.floor(Math.random() * 100);
                }
};