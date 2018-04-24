import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { AdModel } from "../../ad/ad.model";
import { AdService } from "../../ad/ad.service";

@Component({
    selector: 'my-ad-admin',
    styles: [``],
    templateUrl: './ad-admin.component.html'
})
export class AdAdminComponent implements OnInit {

    @Input() ad: AdModel;
    @Output() removeEvent = new EventEmitter<AdModel>();

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.getRemainingTime();
    }

    getRemainingTime() {
        return this.adService.getRemainingTime(String(this.ad.expirationDate));
    }

    removeAd() {
        this.adService.removeAd(this.ad.id)
            .subscribe(
                (response: Response) => {
                    console.log(response);
                    this.removeEvent.emit(this.ad);
                },
                error => console.log(error));
    }
}