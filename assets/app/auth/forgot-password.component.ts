import {Component} from "@angular/core";

@Component({
    selector: 'my-forgot-password',
    template: `
        <div class="container-fluid margin-top-sm" id="content">
            <div class="row padding-top-lg padding-bottom-lg" id="login-row">
                <div class="col-sm-12 col-md-4 col-md-offset-4 bg-white padding-top-md padding-bottom-md">
                    <form action="/auth/forgot-password">
                        <div class="form-group">
                            <label for="email">Adresa email:</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Parola noua:</label>
                            <input type="password" class="form-control" id="pwd">
                        </div>
                        <button type="submit" class="btn btn-success btn-block">Modifica parola</button>
                    </form>
                </div>
            </div>
        </div>
    `
})
export class ForgotPasswordComponent {

}