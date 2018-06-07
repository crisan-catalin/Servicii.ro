import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { ErrorService } from "../error/error.service";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SearchModel } from "./search.model";
import { AdModel } from "../ad/ad.model";
import { MapService } from "../map/map.service";
import { LOCATION_INITIALIZED } from "@angular/common";

export const SERVER_PATH = 'https://servicii-ro.herokuapp.com/api';

@Injectable()
export class SearchService {

    private adSource = new BehaviorSubject<AdModel[]>(null);
    filteredAds = this.adSource.asObservable();

    private adsListInit = new BehaviorSubject<any>(null);
    adsListInitialized = this.adsListInit.asObservable();

    constructor(private http: Http, private mapService: MapService, private errorService: ErrorService) { }

    initAdsList() {
        this.adsListInit.next(null);
    }

    filterdAds(searchModel: SearchModel) {
        return this.mapService.getGeoFromLocation(searchModel.location)
            .map(
                location => {
                    if (searchModel.location == null || searchModel.location == undefined || searchModel.location == '') {
                        return { location: { lat: null, lng: null } };
                    }

                    return location.results[0].geometry.location;
                }
            )
            .switchMap(location => {
                return this.filterAdsFrom(searchModel, location.lat, location.lng);
            });
    }

    private filterAdsFrom(searchModel: SearchModel, forLat: Number, andLng: Number) {
        var queryParams = searchModel.service != null && searchModel.service.length > 0 ? "q=" + searchModel.service : "";

        if (searchModel.category != null && searchModel.category != "all") {
            if (queryParams != "") {
                queryParams += "&";
            }
            queryParams += "category=" + searchModel.category;
        }
        if (forLat != null && andLng != null) {
            if (queryParams != "") {
                queryParams += "&";
            }
            queryParams += "lat=" + forLat;
            queryParams += "&lng=" + andLng;
        }

        let query = queryParams != "" ? "?" + queryParams : "";

        return this.http.get(SERVER_PATH + '/search' + query)
            // Map automatically convert response to Observable
            .map((response: Response) => {
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, ad.description, ad.categoryId.name, ad.location, ad.expirationDate));
                }

                this.adSource.next(adsArray);
            })
            .catch((error: Response) => { return Observable.throw(error.json()) });

    }
}