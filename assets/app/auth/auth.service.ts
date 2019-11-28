import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../error/error.service";
import { SERVER_PATH } from "../ad/ad.service";
let jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(SERVER_PATH + '/auth/signup', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(SERVER_PATH + '/auth/login', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    changePassword(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(SERVER_PATH +'/auth/forgot-password', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        let token = localStorage.getItem('token');
        let tokenExpiration = localStorage.getItem('tokenExpiration');

        if (token != null && tokenExpiration != null) {
            let tokenExpirationDate = Number(tokenExpiration);
            if (tokenExpirationDate > Date.now()) {
                return true;
            } else {
                localStorage.clear();
            }
        }
        return false;
    }
}