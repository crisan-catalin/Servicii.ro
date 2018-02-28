import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            username: new FormControl(null, Validators.compose([Validators.required, Validators.min(6), Validators.max(20)])),
            email: new FormControl(null, Validators.compose([
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ])),
            password: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required)
        });
    }

    onSignup() {
        const user = new User(
            this.signupForm.value.email,
            this.signupForm.value.password,
            this.signupForm.value.username,
            this.signupForm.value.phone,
            this.signupForm.value.address
        );

        this.authService.signup(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('tokenExpiration', data.tokenExpiration);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.signupForm.reset();
    }

}