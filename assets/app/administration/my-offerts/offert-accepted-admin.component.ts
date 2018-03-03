import { Component, Input } from "@angular/core";
import { OffertModel } from "../../offerts/offert.model";

@Component({
    selector: 'my-offert-accepted-admin',
    styles: [`
        .well-success {
            background: #d1eac8;
        }
    `],
    templateUrl: './offert-accepted-admin.component.html'
})
export class OffertAcceptedAdminComponent {

    @Input() offert: OffertModel;
}