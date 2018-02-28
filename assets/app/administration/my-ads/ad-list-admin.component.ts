import { Component, OnInit } from "@angular/core";
import { AdService } from "../../ad/ad.service";
import { AdModel } from "../../ad/ad.model";

@Component({
    selector: 'my-ad-list-admin',
    styles: [``],
    templateUrl: './ad-list-admin.component.html'
})
export class AdListAdminComponent implements OnInit {

    userAds: AdModel[] = [];

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.adService.getUserAds()
            .subscribe(
                data => this.userAds = data,
                error => console.error(error)
            );
    }
}