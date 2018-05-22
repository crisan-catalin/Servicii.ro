import { Component, Input, OnInit } from "@angular/core";
import { OffertModel } from "../../offerts/offert.model";
import { AdService } from "../../ad/ad.service";
import { ImageService } from "../../image.service";

@Component({
    selector: 'my-offert-accepted-admin',
    styles: [`
        .well-success {
            background: #d1eac8;
        }

        #adImage {
            height: 120px;
            width: 120px;
            object-fit: contain;
        }
    `],
    templateUrl: './offert-accepted-admin.component.html'
})
export class OffertAcceptedAdminComponent implements OnInit {

    @Input() offert: OffertModel;
    adImage: any;

    constructor(private adService: AdService, private imageService: ImageService) { }

    ngOnInit() {
        this.adService.getAdMainImage(this.offert.adId._id, 'other')
            .subscribe(
                data => this.adImage = this.imageService.getBase64Image(data._body)
            );
    }
}