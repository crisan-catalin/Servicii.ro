import { Component, OnInit } from "@angular/core";
import { OffertService } from "../../offerts/offert.service";
import { OffertModel } from "../../offerts/offert.model";

@Component({
    selector: 'my-offert-list-admin',
    styles: [`
        @media (min-width: 768px) {
            #details-row {
                display: flex;
                align-items: center;
                text-align:center;
            }
        }

      
    `],
    templateUrl: './offert-list-admin.component.html'
})
export class OffertListAdminComponent implements OnInit {

    offertsAccepted: [OffertModel];
    offertsHolding: [OffertModel];

    constructor(private offertService: OffertService) { }

    ngOnInit() {
        this.offertService.getUserAcceptedOfferts()
            .subscribe(
                data => {
                    this.offertsAccepted = data.result;
                },
                error => console.log(error)
            );
        this.offertService.getUserHoldingOfferts()
            .subscribe(
                data => {
                    this.offertsHolding = data.result;
                },
                error => console.log(error)
            );
    }

    onRemoveHoldingOffert(offert: OffertModel) {
        let offertIndex = this.offertsHolding.indexOf(offert);
        if (offertIndex > -1) {
            this.offertsHolding.splice(offertIndex, 1);
        }
    }
}