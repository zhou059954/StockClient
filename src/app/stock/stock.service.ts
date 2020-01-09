import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Stock } from './stock';

@Injectable()
export class StockService {
    StockUrl = 'https://stockfruit.herokuapp.com/';
    constructor(private http: Http) {
    }
    getAllStock(): Observable<Stock[]> {
        return this.http.get(this.StockUrl + 'stocks')
            .map(this.extractData)
            .catch(this.handleError);

    }

    createStock(stock: Stock): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.StockUrl + 'stock', stock, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getLoginStocks(login: string, mdp: string): Observable<Stock[]> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('login', login);
        cpParams.set('mdp', mdp);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.post(this.StockUrl + 'autentification', options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    getStockById(id_stock: string): Observable<Stock> {
        console.log("id-service = " + id_stock);
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('id', id_stock);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.get(this.StockUrl + 'stock', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateStock(stock: Stock, id_stock: string,stockenplus): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('id', id_stock);
        cpParams.set('stockplus', stockenplus);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        console.log("update /////" + this.StockUrl + 'stock', stock, options);
        return this.http.put(this.StockUrl + 'stock', stock, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    deleteStockById(id_stock: string): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('id', id_stock);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.delete(this.StockUrl + 'stock', options)
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
