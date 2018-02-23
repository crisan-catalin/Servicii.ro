import {Component} from "@angular/core";

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
export class OffertListAdminComponent {

    offertsAccepted = ["acc_off"];
    offertsHolding = ["holding_off"];
}