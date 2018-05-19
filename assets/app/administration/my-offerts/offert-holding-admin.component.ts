import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { OffertModel } from "../../offerts/offert.model";
import { AdService } from "../../ad/ad.service";
import { OffertService } from "../../offerts/offert.service";
import { ImageService } from "../../image.service";

@Component({
    selector: 'my-offert-holding-admin',
    styles: [`
        #adImage {
            max-height: 120px;
        }
    `],
    templateUrl: './offert-holding-admin.component.html'
})
export class OffertHoldingAdminComponent implements OnInit {

    @Input() offert: OffertModel;
    adImage: any;

    @Output() removeEvent = new EventEmitter<OffertModel>();
    remainingTime: String;

    constructor(private adService: AdService, private offertService: OffertService, private imageService: ImageService) { }

    ngOnInit() {
        this.remainingTime = this.adService.getRemainingTime(String(this.offert.adId.expirationDate));
        this.adService.getAdMainImage(this.offert.adId._id, 'other')
            .subscribe(
                data => this.adImage = this.imageService.getBase64Image(data._body)
            )
    }

    onRemoveOffert() {
        this.offertService.removeOffert(this.offert._id)
            .subscribe(
                data => {
                    console.log(data);
                    this.removeEvent.emit(this.offert);
                },
                error => console.log(error)
            );
    }
}