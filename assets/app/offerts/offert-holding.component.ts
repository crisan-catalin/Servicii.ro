import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OffertService } from "./offert.service";
import { OffertHoldingModel } from "./offert-holding.model";

@Component({
    selector: '[app-offert]',
    templateUrl: './offert-holding.component.html'
})
export class OffertHoldingComponent {

    //Must hardcode out property for <tr>
    @Input("offert") offert: OffertHoldingModel;
    @Output() offertWasAproved = new EventEmitter<OffertHoldingModel>();
    @Output() offertWasCanceled = new EventEmitter<OffertHoldingModel>();

    constructor(private offertService: OffertService) { }

    onAprove() {
        this.offertService.aproveOffert(this.offert.id, this.offert.adId)
            .subscribe(
                data => {
                    console.log(data);
                    this.offertWasAproved.emit(this.offert);
                },
                error => console.log(error)
            );
    }

    onDenied() {
        this.offertService.deniedOffert(this.offert.id, this.offert.adId)
            .subscribe(
                data => {
                    console.log(data);
                    this.offertWasCanceled.emit(this.offert);
                },
                error => console.log(error)
            );
    }
}