import { Component, Input, OnInit } from "@angular/core";
import { AdModel } from "./ad.model";
import { AdService } from "./ad.service";

import { Observable } from "rxjs";

@Component({
    selector: 'my-ad',
    styles: [`
        .caption {
            display: -webkit-box;
            line-height: 1.2;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .border-bottom-sm {
            border-bottom: 1px solid dimgrey;
        }

        #request-image {
            margin-left: 20px;
        }

        #request-title {
            margin-top: 0px;
        }

        #request-container {
            margin-left: 1.33333333%;
        }

        #request-information {
            font-size: 12px;
            margin-bottom: 0px;
        }

        #request-time-and-distance {
            padding-top: 10px;
        }

        .center-element {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
        }

        .center-element button {
            border-radius: 0px;
            border: 1px solid black;
        }
    `],
    templateUrl: './ad.component.html'
})
export class AdComponent implements OnInit {

    @Input() ad: AdModel;
    distance: Number;

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.adService.getDistanceTo(this.ad.location,
            error => this.distance = null,
            calculatedDistance => this.distance = Math.trunc(calculatedDistance)
        );
    }

    getDistanceText() {
        if (this.distance > 100) {
            return 'Distanta peste 100km fata de tine';
        }
        return 'Distanta ' + this.distance + 'km fata de tine';
    }

    getRemainingTime(): String {
        return this.adService.getRemainingTime(String(this.ad.expirationDate));
    }
}