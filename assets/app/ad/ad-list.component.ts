import { Component, OnInit } from "@angular/core";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { SearchService } from "../search/search.service";

@Component({
    selector: 'my-ad-list',
    templateUrl: './ad-list.component.html'
})
export class AdListComponent implements OnInit {

    private ads: AdModel[];

    constructor(private _adService: AdService, private searchService: SearchService) { }

    ngOnInit() {
        this.searchService.initAdsList();

        this.searchService.filteredAds.subscribe(
            (ads: AdModel[]) => {
                this.ads = ads;
            },
            error => console.log(error)
        )

        this._adService.getAllAds()
            .subscribe(
                (data: AdModel[]) => this.ads = data,
                error => console.error(error)
            );

    }
}