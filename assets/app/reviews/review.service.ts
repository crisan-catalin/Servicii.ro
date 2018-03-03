import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { SERVER_PATH } from "../ad/ad.service";

@Injectable()
export class ReviewService {

    constructor(private http: Http) { }

    getReviews(userId: String) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/review/' + userId + token)
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }
}