import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { SERVER_PATH } from '../app.routing';

@Injectable()
export class CategoryService {
    constructor(private http: Http) { }

    getCategories() {
        return this.http.get(SERVER_PATH + '/categorii')
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error.json) });
    }
}