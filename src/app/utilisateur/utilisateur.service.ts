import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Utilisateur } from './utilisateur';

@Injectable()
export class UtilisateurService {
    UtilisateurUrl = 'https://stockfruit.herokuapp.com/';
    constructor(private http: Http) {
    }
    getAllUtilisateur(): Observable<Utilisateur[]> {
        return this.http.get(this.UtilisateurUrl + 'utilisateurs')
            .map(this.extractData)
            .catch(this.handleError);

    }

    createUtilisateur(utilisateur: Utilisateur): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.UtilisateurUrl + 'utilisateur', utilisateur, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getLoginUtilisateurs(login: string, mdp: string): Observable<Utilisateur[]> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('login', login);
        cpParams.set('mdp', mdp);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.post(this.UtilisateurUrl + 'autentification', options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    getUtilisateurById(id_utilisateur: string): Observable<Utilisateur> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('id', id_utilisateur);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.get(this.UtilisateurUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateUtilisateur(utilisateur: Utilisateur): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.UtilisateurUrl + 'utilisateur', utilisateur, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    deleteUtilisateurById(id_utilisateur: string): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('id', id_utilisateur);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.delete(this.UtilisateurUrl + 'utilisateur', options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body;
    }
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

}
