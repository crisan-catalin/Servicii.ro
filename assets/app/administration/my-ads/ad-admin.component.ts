import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { AdModel } from "../../ad/ad.model";
import { AdService } from "../../ad/ad.service";
import { ImageService } from "../../image.service";

@Component({
    selector: 'my-ad-admin',
    styles: [`
        #adImage {
            max-height: 120px;
        }
    `],
    templateUrl: './ad-admin.component.html'
})
export class AdAdminComponent implements OnInit {

    @Input() ad: AdModel;
    adImage: any;

    @Output() removeEvent = new EventEmitter<AdModel>();

    constructor(private adService: AdService, private imageService: ImageService) { }

    ngOnInit() {
        this.getRemainingTime();
        this.adService.getAdMainImage(this.ad.id, this.ad.categoryName)
            .subscribe(
                data => this.adImage = this.imageService.getBase64Image(data._body)
            );
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