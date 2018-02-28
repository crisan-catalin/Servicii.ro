import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { AdModel } from "./ad.model";
import { ErrorService } from "../error/error.service";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

export const SERVER_PATH = 'http://localhost:3000/api/anunturi';

@Injectable()
export class AdService {
    constructor(private http: Http, private errorService: ErrorService) { }

    saveAd(ad: AdModel) {
        const body = JSON.stringify(ad);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(SERVER_PATH + '/adauga-anunt' + token, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    getAllAds() {
        return this.http.get(SERVER_PATH)
            // Map automatically convert response to Observable
            .map((response: Response) => {
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, ad.description, undefined, ad.location, ad.expirationDate));
                }

                return adsArray;
            })
            // Catch don't convert response to Observabla
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    getUserAds() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(SERVER_PATH + '/my-account/anunturi' + token)
            .map((response: Response) => {
                console.log(response);
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, undefined, undefined, undefined, ad.expirationDate));
                }

                return adsArray;
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getAdsByCategory(categoryName: string) {
        return this.http.get(SERVER_PATH + '/' + categoryName)
            .map((response: Response) => {
                const ads = response.json().result;
                let adsFromCategory: AdModel[] = [];
                for (let ad of ads) {
                    let currentAd = new AdModel(
                        ad._id,
                        undefined,
                        ad.title,
                        ad.description,
                        categoryName,
                        ad.location,
                        ad.expirationDate
                    );
                    adsFromCategory.push(currentAd);
                }
                return adsFromCategory;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getCategories() {
        return this.http.get('http://localhost:3000/api/categorii')
            .map((response: Response) => {
                return response;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }
}