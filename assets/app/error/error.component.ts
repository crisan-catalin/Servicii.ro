import {Component, OnInit} from "@angular/core";
import {Error} from "./error.model";
import {ErrorService} from "./error.service";
import {error} from "util";

@Component({
    selector: "app-error",
    templateUrl: "./error.component.html",
    styles: [`
        .backdrop {
            background-color: rgba(0, 0, 0, 0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = "none";

    constructor(private errorService: ErrorService) {
    }

    onErrorHandle() {
        this.display = "none";
    }

    ngOnInit() {
        this.errorService.errorOccured.subscribe(
            (error: Error) => {

                console.log("Hello error - subscribe");
                this.error = error;
                this.display = 'block';
            }
        );
    }
}