import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs";

// import mapboxgl = require('mapbox-gl');
import * as mapboxgl from 'mapbox-gl';
const GOOGLE_API_KEY = 'AIzaSyC90g-XLGfZmm7wUapbQ_K78ujXTXqgV8U';

@Injectable()
export class MapService {

    constructor(private http: Http) {
        mapboxgl.accessToken = "pk.eyJ1IjoiYW5vbmltNTAiLCJhIjoiY2o4Njl1cDFjMHV4ZDJxbzYzZW9jb2FzcCJ9.Zh5SAW3LoVIVRz-huLw7_Q";
    }

    getGeoFromLocation(address: string) {
        if (address == null || address == undefined || address == '') {
            return of({});
        }
        
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