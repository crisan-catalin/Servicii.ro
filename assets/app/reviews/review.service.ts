import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";

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

    addReview(reviewModel: ReviewModel, reviewImages?: any[]) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let formData = new FormData();
        for (const key of Object.keys(reviewModel)) {
            formData.append(key, reviewModel[key]);
        }

        for (var i = 0; i < reviewImages.length; i++) {
            formData.append('reviewImages', reviewImages[i].file, reviewImages[i].file.name);
        }

        let headers = new Headers({ 'enctype': 'multipart/form-data' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(SERVER_PATH + '/review/' + token, formData, options)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }
}