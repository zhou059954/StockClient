export class Stock {
    constructor(
        public _id: string,
        public image: string,
        public nom: string,
        public quantite: number,
        public PU: number
    ) {
    }
}