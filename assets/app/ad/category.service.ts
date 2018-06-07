import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

export const SERVER_PATH = 'https://servicii-ro.herokuapp.com/api';

@Injectable()
export class CategoryService {
    constructor(private http: Http) { }

    getCategories() {
        return this.http.get(SERVER_PATH + '/categorii')
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error.json) });
    }
}