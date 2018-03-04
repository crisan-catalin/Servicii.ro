import { Component, Input, OnInit } from "@angular/core";
import { OffertModel } from "./offert.model";
import { OffertService } from "./offert.service";

@Component({
    selector: '[app-offert]',
    templateUrl: './offert.component.html'
})
export class OffertComponent {

    //Must hardcode out property for <tr>
    @Input("offert") offert: any;

    constructor(private offertService: OffertService) { }

    onAprove() {
        this.offertService.aproveOffert(this.offert.offert._id, this.offert.ad.id)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
    }

    onDenied() {
        this.offertService.deniedOffert(this.offert.offert._id);
    }
}