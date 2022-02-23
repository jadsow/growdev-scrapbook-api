export default class Recado {
    id: number;
    constructor (public prioridade: number,
                 public recado: string) {
            this.id = Math.floor(Math.random() * 100);
                 }

}