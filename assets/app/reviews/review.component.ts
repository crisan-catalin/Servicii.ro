import { Component, Input } from "@angular/core";
import { ReviewModel } from "./review.model";

@Component({
    selector: 'my-review',
    styles: [`
        .center-element {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
        }

        .center-element button {
            border-radius: 0px;
            border: 1px solid black;
        }
    `],
    templateUrl: './review.component.html'
})
export class ReviewComponent {

    @Input() review: ReviewModel;

    getRatingAsText(rate) {
        if (rate == 1) {
            return "Nemultumit";
        } else if (rate == 2) {
            return "Neutru";
        } else if (rate == 3) {
            return "Multumit";
        } else {
            return "Foarte multumit";
        }
    }
}