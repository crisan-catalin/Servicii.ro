import { Component, OnInit } from "@angular/core";
import { AdModel } from "./ad.model";
import { SearchService } from "../search/search.service";
import { PaginationService } from "../pagination/pagination.service";

@Component({
    selector: 'my-ad-list',
    templateUrl: './ad-list.component.html'
})
export class AdListComponent implements OnInit {

    readonly ITEMS_PER_PAGE = 4;
    currentPage = 1;

    ads: AdModel[];
    currentAds: AdModel[] = [];

    constructor(private searchService: SearchService, private paginationService: PaginationService) { }

    ngOnInit() {
        this.searchService.initAdsList();

        this.searchService.filteredAds.subscribe(
            (ads: AdModel[]) => {
                this.ads = ads;

                if(ads != null) {
                    this.currentAds = this.setAdsForPage(this.currentPage);
                }
            },
            error => console.log(error)
        )
    }

    setAdsForPage(page: number): AdModel[] {
        let lowerLimit = this.paginationService.getLowerLimit(this.ITEMS_PER_PAGE, page);
        let upperLimit = lowerLimit + this.ITEMS_PER_PAGE;

        return this.ads.slice(lowerLimit, upperLimit);
    }

    pageChanged(event){
        this.currentPage = event.page;
        this.currentAds = this.setAdsForPage(this.currentPage);
    }
}