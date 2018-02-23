import {Component} from "@angular/core";

@Component({
    selector: 'my-review-list',
    styles: [`
        .bg-default {
            background: #f2f2f2;
        }

        .bottom-shadow {
            box-shadow: 0px 1px 7px #888888;
        }
    `],
    templateUrl: './review-list.component.html'
})
export class ReviewListComponent {
    reviews = ['review', 'review'];
}