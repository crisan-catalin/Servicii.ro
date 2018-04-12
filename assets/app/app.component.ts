import { Component } from '@angular/core';

import { MessageService } from "./messages/message.service";
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {

    constructor(private router: Router) { }
}