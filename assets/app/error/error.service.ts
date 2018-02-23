import {EventEmitter, OnInit} from "@angular/core";
import {Error} from "./error.model";

export class ErrorService {
    errorOccured = new EventEmitter<Error>();

    public handleError(error: any) {
        console.log("Hello error - before handle");
        console.log(error);
        const errorData = new Error(error.title, error.error.message);
        console.log("Hello error - after handle");
        this.errorOccured.emit(errorData);
    }

}