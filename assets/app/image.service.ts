import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { SERVER_PATH } from "./search/search.service";

@Injectable()
export class ImageService {

    constructor(private http: Http) { }

    uploadCertificate(file, title, categoryId) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let formData = new FormData();
        formData.append('certificateImage', file, file.name);
        formData.append('title', title);
        formData.append('category', categoryId);

        let headers = new Headers({ 'enctype': 'multipart/form-data' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(SERVER_PATH + '/my-account/setari/user-info/certificate' + token, formData, options)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }
}