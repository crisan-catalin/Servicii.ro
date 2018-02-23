import {Component} from "@angular/core";

@Component({
    selector: 'my-authentification',
    styles: [`
        #login-row {
            min-height: 500px;
        }

        #content {
            background: url(https://static.pexels.com/photos/474/black-and-white-car-vehicle-vintage.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .bg-white {
            background: white;
        }

        li:not(:active) > a {
            background: #EBEBEB;
        }

        nav {
            padding-top: 20px;
            padding-bottom: 10px;
        }
        
        .nav-tabs {
            border-bottom: 0;
        }

        .nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover {
            border-width: 0;
            border-bottom: 1px solid black;
        }

        .tab-content {
            height: 330px;
        }

        .half-full-width {
            width: 50%
        }
    `],
    templateUrl: './authentification.component.html'
})
export class AuthentificationComponent {

}