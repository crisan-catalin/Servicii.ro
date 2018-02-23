import {Component} from "@angular/core";

@Component({
    selector: 'my-ad',
    styles: [`
        .border-bottom-sm {
            border-bottom: 1px solid dimgrey;
        }

        #request-image {
            margin-left: 20px;
        }

        #request-title {
            margin-top: 0px;
        }

        #request-container {
            margin-left: 1.33333333%;
        }

        #request-information {
            font-size: 12px;
            margin-bottom: 0px;
        }

        #request-time-and-distance {
            padding-top: 10px;
        }

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
    templateUrl: './ad.component.html'
})
export class AdComponent {

}