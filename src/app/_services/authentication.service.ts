import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

    // loginUrl = 'https://m1p6mean-4zo-server.herokuapp.com/';
    loginUrl = 'https://stockfruit.herokuapp.com/';
    constructor(private http: Http) { }

    login(login: string, mdp: string): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.loginUrl + 'autentification?email=' + login + '&mdp=' + mdp, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        const body = res.json();
        // console.log("body  " + body);
        localStorage.setItem('currentUser', JSON.stringify(body));
        // console.log(JSON.stringify(body));
        return body;
    }
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

    logout() {
        // retirer l'utilisateur du stockage local pour le déconnecter
        localStorage.removeItem('currentUser');
    }
}
