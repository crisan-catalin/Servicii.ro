import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { OffertModel } from "./offert.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";

export const SERVER_PATH = 'http://localhost:3000/api';

@Injectable()
export class OffertService {

    constructor(private http: Http) { }

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

    getReceivedOfferts() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/oferte' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

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

    aproveOffert(offertId: String, adId: String) {
        let body = { adId: adId };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch(SERVER_PATH + '/oferte/' + offertId + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error) });
    }

    deniedOffert(offertId: String) {

    }
}