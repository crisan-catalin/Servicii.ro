import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { OffertModel } from "../../offerts/offert.model";
import { AdService } from "../../ad/ad.service";
import { OffertService } from "../../offerts/offert.service";

@Component({
    selector: 'my-offert-holding-admin',
    styles: [``],
    templateUrl: './offert-holding-admin.component.html'
})
export class OffertHoldingAdminComponent implements OnInit {

    @Input() offert: OffertModel;
    @Output() removeEvent = new EventEmitter<OffertModel>();
    remainingTime: String;

    constructor(private adService: AdService, private offertService: OffertService) { }

    ngOnInit() {
        this.remainingTime = this.adService.getRemainingTime(String(this.offert.adId.expirationDate));
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