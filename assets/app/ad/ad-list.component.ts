import { Component, OnInit } from "@angular/core";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";

@Component({
    selector: 'my-ad-list',
    templateUrl: './ad-list.component.html'
})
export class AdListComponent implements OnInit {

    private ads: AdModel[];

    constructor(private _adService: AdService) { }

    ngOnInit() {
        this._adService.getAllAds()
            .subscribe(
                (data: AdModel[]) => this.ads = data,
                error => console.error(error)
            );
    }
}