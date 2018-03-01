import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

const GOOGLE_API_KEY = 'AIzaSyC90g-XLGfZmm7wUapbQ_K78ujXTXqgV8U';

@Injectable()
export class MapService {

    constructor(private http: Http) { }

    getGeoFromLocation(address: string) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_API_KEY)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error.json) });
    }

    getLocationFromGeo(lat: Number, lng: Number) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + GOOGLE_API_KEY)
            .map((response: Response) => response.json())
            .catch((error: Response) => { return Observable.throw(error.json) });
    }
}