import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { ErrorService } from "../error/error.service";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SearchModel } from "./search.model";
import { AdModel } from "../ad/ad.model";

export const SERVER_PATH = 'http://localhost:3000/api';

@Injectable()
export class SearchService {

    private adSource = new BehaviorSubject<AdModel[]>(null);
    filteredAds = this.adSource.asObservable();

    constructor(private http: Http, private errorService: ErrorService) { }

    //TODO: filter for category and location
    filterdAds(searchModel: SearchModel) {
        var queryParams = "";
        //Diferit de null si ""
        queryParams += searchModel.service != null ? "q=" + searchModel.service : "";

        var query = queryParams != "" ? "?" + queryParams : "";
        return this.http.get(SERVER_PATH + '/search' + query)
            // Map automatically convert response to Observable
            .map((response: Response) => {
                console.log(response);
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, ad.description, ad.categoryId.name, ad.location, ad.expirationDate));
                }

                this.adSource.next(adsArray);
            })
            // Catch don't convert response to Observabla
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }
}