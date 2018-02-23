import {Component} from "@angular/core";

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

        /* Stars */
        .stars {
            padding-left: 5px;
        }

        .star {
            color: yellow;
            text-shadow: 0px 0px 2px #000;
        }

        .star .fa.fa-star-o {
            color: black;
            text-shadow: 0px 0px 0px #000;
        }
    `],
    templateUrl: './review.component.html'
})
export class ReviewComponent {

}