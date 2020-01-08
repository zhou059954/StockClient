export class Utilisateur {
    constructor(
        public _id: string,
        public nom: string,
        public prenom: string,
        public date_naissance: string,
        public lieu: string,
        public email: string,
        public mdp: string

    ) {
    }
}
