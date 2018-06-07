import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { OffertModel } from "./offert.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";

export const SERVER_PATH = 'https://servicii-ro.herokuapp.com/api';

@Injectable()
export class OffertService {

    constructor(private http: Http) { }

    getUserAcceptedOfferts() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/oferte/accepted' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getUserHoldingOfferts() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/oferte/holding' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    removeOffert(offertId: String) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.delete(SERVER_PATH + '/oferte/sterge-oferta/' + offertId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    addOffert(offert: OffertModel) {
        let body = JSON.stringify(offert);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.post(SERVER_PATH + '/oferte/oferta-noua' + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getHoldingOffertsCount() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/oferte/count' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getHoldingOfferts() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/oferte' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getAcceptedOfferts() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/oferte/solved' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    aproveOffert(offertId: String, adId: String) {
        let body = { adId: adId };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch(SERVER_PATH + '/oferte/aprobat/' + offertId + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    deniedOffert(offertId: String, adId: String) {
        let body = { adId: adId };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch(SERVER_PATH + '/oferte/respins/' + offertId + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }
}