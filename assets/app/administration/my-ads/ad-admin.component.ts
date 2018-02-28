import { Component, Input, OnInit } from "@angular/core";
import { AdModel } from "../../ad/ad.model";
import { AdService } from "../../ad/ad.service";

var moment = require('moment');

@Component({
    selector: 'my-ad-admin',
    styles: [``],
    templateUrl: './ad-admin.component.html'
})
export class AdAdminComponent implements OnInit {

    @Input() ad: AdModel;

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.getExpirationDate();
    }

    getExpirationDate() {
        var now = moment(Date().toLocaleLowerCase()).format("DD/MM/YYYY HH:mm:ss");
        var then = moment(String(this.ad.expirationDate)).format("DD/MM/YYYY HH:mm:ss");

        let HOUR_MS = 60 * 60 * 1000;
        let DAY_MS = 24 * HOUR_MS;

        var ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"));
        let remainingDays = Math.floor(ms / DAY_MS);
        let remainingHours = Math.floor((ms % DAY_MS) / HOUR_MS);

        return String(remainingDays + 'z ' + remainingHours + 'h');
    }

    removeAd() {
        this.adService.removeAd(this.ad.id)
            .subscribe((response: Response) => {
                //TODO: handle remove ad
                console.log(response);
            },
                error => console.log(error));
    }
}