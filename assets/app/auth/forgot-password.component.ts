import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "my-forgot-password",
  templateUrl: "./forgot-password.component.html"
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
        )
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onChangePassword() {
    let user = new User(
      this.forgotPasswordForm.value.email,
      this.forgotPasswordForm.value.password
    );

    this.authService.changePassword(user).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("/auth");
      },
      error => console.error(error)
    );
  }
}
