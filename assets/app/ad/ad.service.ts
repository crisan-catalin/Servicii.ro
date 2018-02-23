import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AdModel} from "./ad.model";

@Injectable()
export class AdService {
    constructor(private http: Http) {
    }

    saveAd(ad: any) {
        const body = JSON.stringify(ad);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/ad' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result.obj._id;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getAdsByCategory(categoryName: string) {
        return this.http.get('http://localhost:3000/' + categoryName)
            .map((response: Response) => {
                const ads = response.json.objl
                let adsFromCategory: AdModel[] = [];
                for (let ad of ads) {
                    let currentAd = new AdModel();
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
        return this.http.get('http://localhost:3000')
            .map((response: Response) => {
                return response;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }
}