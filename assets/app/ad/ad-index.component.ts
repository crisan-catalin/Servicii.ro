import { Component, OnInit } from "@angular/core";
import { AdModel } from "./ad.model";
import { AdService } from "./ad.service";

@Component({
    selector: 'ad-index',
    templateUrl: './ad-index.component.html'
})
export class AdIndexComponent implements OnInit {

    ADS_LIMIT = 2;

    lastAds: AdModel[];

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.adService.getLastAds(this.ADS_LIMIT)
            .subscribe(
                (data: AdModel[]) => {
                    this.lastAds = data;
                },
        )
    }
}