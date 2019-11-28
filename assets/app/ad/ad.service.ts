import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, ResponseContentType } from "@angular/http";
import { AdModel } from "./ad.model";
import { ErrorService } from "../error/error.service";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

export const SERVER_PATH = 'http://localhost:3000/api';
let moment = require('moment');
let jwt = require('jsonwebtoken');

@Injectable()
export class AdService {
    constructor(private http: Http, private errorService: ErrorService) { }

    removeAd(adId: String) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.delete(SERVER_PATH + '/anunturi/' + adId + token)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    saveAd(ad: AdModel, adImages?: any[]) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let formData = new FormData();
        for (const key of Object.keys(ad)) {
                formData.append(key, ad[key]);
        }
        formData.append("lat", String(ad.location.lat));
        formData.append("lng", String(ad.location.lng));

        for (var i = 0; i < adImages.length; i++) {
            formData.append('adImages', adImages[i].file, adImages[i].file.name);
        }

        return this.http.post(SERVER_PATH + '/anunturi/adauga-anunt' + token, formData)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }

    updateAd(ad: AdModel) {
        let body = {};
        body['adId'] = ad.id;
        ad.id = undefined;
        body['ad'] = ad;
        body = JSON.stringify(body);

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(SERVER_PATH + '/anunturi/adauga-anunt' + token, body, { headers: headers })
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    getAdMainImage(adId: String, categoryName: string) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let options = new RequestOptions({ responseType: ResponseContentType.ArrayBuffer });

        return this.http.get(SERVER_PATH + '/anunturi/' + categoryName + '/' + adId + '/image' + token, options)
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getAdImages(adId: String, categoryName: string) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get(SERVER_PATH + '/anunturi/' + categoryName + '/' + adId + '/images' + token)
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getAd(id: String, categoryName: string) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(SERVER_PATH + '/anunturi/' + categoryName + '/' + id + token)
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    getAdForEdit(id: String) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(SERVER_PATH + '/anunturi/adauga-anunt/' + id + token)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    getLastAds(count) {
        return this.http.get(SERVER_PATH + '/anunturi?limit=' + count)
            .map((response: Response) => {
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, ad.description, ad.categoryId.name, ad.location, ad.expirationDate));
                }

                return adsArray;
            })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    getAdsRangeForCoords(lat, lng) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(SERVER_PATH + '/anunturi/location/coords?lat=' + lat + '&lng=' + lng)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error.json()) });
    }

    // Unused method
    getAllAds() {
        return this.http.get(SERVER_PATH + '/anunturi')
            // Map automatically convert response to Observable
            .map((response: Response) => {
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, ad.description, ad.categoryId.name, ad.location, ad.expirationDate));
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
                const ads = response.json().result;
                let adsArray: AdModel[] = [];

                for (const ad of ads) {
                    adsArray.push(new AdModel(ad._id, undefined, ad.title, undefined, ad.categoryId.name, undefined, ad.expirationDate));
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
        return this.http.get(SERVER_PATH + '/categorii')
            .map((response: Response) => {
                return response;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    getRemainingTime(expirationDate: String): String {
        var now = moment(Date().toLocaleLowerCase()).format("DD/MM/YYYY HH:mm:ss");
        var then = moment(String(expirationDate)).format("DD/MM/YYYY HH:mm:ss");

        let HOUR_MS = 60 * 60 * 1000;
        let DAY_MS = 24 * HOUR_MS;

        var ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"));
        let remainingDays = Math.floor(ms / DAY_MS);
        let remainingHours = Math.floor((ms % DAY_MS) / HOUR_MS);

        let result = '';
        if (remainingDays > 0) {
            result += remainingDays + 'z';
        }
        if (remainingHours > 0) {
            result += ' ' + remainingHours + 'h';
        }
        return result;
    }

    getDistanceTo(location: any, errorCallback, callback) {
        this.getUserGeolocation()
            .then((userLocation) => {
                callback(this.calculateDistanceFrom(location, userLocation))
            })
            .catch(() => this.getUserTokenLocation()
                .then((userLocation) => {
                    callback(this.calculateDistanceFrom(location, userLocation));
                })
                .catch((error) => errorCallback(error))
            );
    };

    toRadians(angle: number) { return angle * (Math.PI / 180); }

    calculateDistanceFrom(location: any, userLocation: any): Number {
        let lat1 = Number(location.lat);
        let lat2 = Number(userLocation.lat);
        let lng1 = Number(location.lng);
        let lng2 = Number(userLocation.lng);

        var R = 6371e3; // metres
        var φ1 = this.toRadians(lat1);
        var φ2 = this.toRadians(lat2);
        var Δφ = this.toRadians(lat1 - lat2);
        var Δλ = this.toRadians(lng1 - lng2);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;
        return d / 1000.0;
    }

    getUserGeolocation() {
        if (navigator.geolocation) {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        let lat = position.coords.latitude;
                        let lng = position.coords.longitude;
                        resolve({ lat: lat, lng: lng });
                    },
                    (error) => { reject(error); })
            });
        }
    }

    getUserTokenLocation() {
        return new Promise(function (resolve, reject) {
            let userToken = localStorage.getItem('token');
            jwt.verify(userToken, 'secret_token', function (err, decoded) {
                return err ? reject(err) : resolve(decoded.user.location);
            });
        });
    }
}