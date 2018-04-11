import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OffertService } from "./offert.service";
import { OffertAcceptedModel } from "./offert-accepted.model";

@Component({
    selector: '[app-offert-accepted]',
    templateUrl: './offert-accepted.component.html'
})
export class OffertAcceptedComponent {

    //Must hardcode out property for <tr>
    @Input("offert") offert: OffertAcceptedModel;
    @Output() onReviewPress = new EventEmitter<OffertAcceptedModel>();

    onReview() {
        this.onReviewPress.emit(this.offert);
    }
}