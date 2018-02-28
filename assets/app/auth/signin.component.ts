import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {

    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }


    onLogin() {
        const user = new User(this.loginForm.value.email, this.loginForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    console.log(data);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('tokenExpiration', data.tokenExpiration);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.loginForm.reset();
    }
}