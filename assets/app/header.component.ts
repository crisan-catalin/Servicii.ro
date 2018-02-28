import { Component, OnInit } from "@angular/core";

import * as mapboxgl from 'mapbox-gl';
import { AdService } from "./ad/ad.service";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: 'app-header',
    styles: [`
        nav {
            padding-top: 20px;
            padding-bottom: 10px;
        }

        .navbar {
            border-radius: 0px;
            margin-bottom: 0px;
        }

        ul li {
            margin-right: 50px;
        }

        .navbar-brand {
            font-family: fantasy;
            letter-spacing: 2px;
            color: orange !important;
            font-size: -webkit-xxx-large;
        }

        .glyphicon {
            padding-right: 5px;
            font-size: 22px;
        }

        .badge-notify {
            background: red;
            position: absolute;
            left: -10px;
        }

        @media (max-width: 768px) {
            .navbar-brand {
                position: relative;
                width: 100%;
                left: 0;
                text-align: center;
                margin: 0 auto;
                font-size: xx-large;
            }
        }
    `],
    template: `
        <nav class="navbar navbar-default border-bottom">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" [routerLink]="['/']"> Servicii online</a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li><a [routerLink]="['/auth']" *ngIf="!isLoggedIn()">
                        <span class="glyphicon glyphicon-user"></span>Autentificare</a>
                    </li>
                    <li><a [routerLink]="['/my-account']" *ngIf="isLoggedIn()">
                        <span class="badge badge-notify">4</span>
                        <span class="glyphicon glyphicon-user"></span>Bine ati venit!</a>
                    </li>
                    <li>
                        <button class="btn btn-warning btn-lg">
                            <i class="fa fa-plus"></i> <a [routerLink]="['/anunturi/anunt-nou']">Cere serviciu</a>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    `
})
export class HeaderComponent {

    // <header class="row">
    //     <nav class="col-md-8 col-md-offset-2">
    //         <ul class="nav nav-pills">
    //             <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>
    //             <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
    //         </ul>
    //     </nav>
    // </header>

    constructor(private authService: AuthService) { }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}