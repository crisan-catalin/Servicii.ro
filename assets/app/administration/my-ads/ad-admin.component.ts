import { Component, Input, OnInit } from "@angular/core";
import { AdModel } from "../../ad/ad.model";
import { AdService } from "../../ad/ad.service";

@Component({
    selector: 'my-ad-admin',
    styles: [``],
    templateUrl: './ad-admin.component.html'
})
export class AdAdminComponent implements OnInit {

    @Input() ad: AdModel;

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.getRemainingTime();
    }

    getRemainingTime() {
        return this.adService.getRemainingTime(String(this.ad.expirationDate));
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