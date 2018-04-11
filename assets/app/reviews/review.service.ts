import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { SERVER_PATH } from "../ad/ad.service";
import { ReviewModel } from "./review.model";

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

    addReview(reviewModel: ReviewModel) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let body = JSON.stringify(reviewModel);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(SERVER_PATH + '/review/' + token, body, { headers: headers })
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }
}