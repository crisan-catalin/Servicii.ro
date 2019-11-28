import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { SERVER_PATH } from "./search/search.service";

@Injectable()
export class ImageService {

    constructor(private http: Http) { }

    getBase64Image(data): string {
        var base64 = btoa(
            new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return 'data:image/png;base64,' + base64;
    }

    uploadCertificate(file, title, categoryId) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let formData = new FormData();
        formData.append('certificateImage', file, file.name);
        formData.append('title', title);
        formData.append('category', categoryId);

        return this.http.post(SERVER_PATH + '/my-account/setari/user-info/certificate' + token, formData)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }
}