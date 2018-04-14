import { Component, OnInit } from "@angular/core";

import * as mapboxgl from 'mapbox-gl';
import { AdService } from "./ad/ad.service";
import { AuthService } from "./auth/auth.service";
import { OffertService } from "./offerts/offert.service";

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
                    <li class="padding-right-lg">
                        <a [routerLink]="['/auth']" *ngIf="!isLoggedIn()">
                            <span class="glyphicon glyphicon-user"></span>
                            Autentificare
                        </a>
                    </li>
                    <li *ngIf="isLoggedIn()" class="padding-right-lg">
                       

                    <span dropdown> 
                        <a dropdownToggle (click)="false">
                            <span class="glyphicon glyphicon-user"></span>
                            <span *ngIf="offertsReceived !== undefined && offertsReceived > 0" class="badge badge-notify">
                                {{offertsReceived}}
                            </span>
                            Bine ati venit!
                            <span class="caret"></span>
                        </a>
                        <ul *dropdownMenu class="dropdown-menu">
                            <li>
                                <a routerLink="/my-account">
                                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                                    Profilul tau
                                </a>
                            </li>
                            <li>
                                <a routerLink="/oferte">
                                    <i *ngIf="offertsReceived !== undefined && offertsReceived > 0;else showEmpty" class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                    <ng-template #showEmpty>
                                        <i class="fa fa-circle-o" aria-hidden="true"></i>
                                    </ng-template>
                                    Oferte primite
                                </a>
                            </li>
                            <li class="divider dropdown-divider"></li>
                            <li>
                                <a (click)="logOut()" routerLink="/" class="dropdown-item">
                                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    Deconectare
                                </a>
                            </li>
                        </ul>
                    </span>


                    </li>
                    <li class="padding-right-lg">
                        <button class="btn btn-warning btn-lg">
                            <i class="fa fa-plus"></i> 
                            <a *ngIf="isLoggedIn()" [routerLink]="['/anunturi/anunt-nou']">Cere serviciu</a>
                            <a *ngIf="!isLoggedIn()" [routerLink]="['/auth']">Cere serviciu</a>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    `
})
export class HeaderComponent implements OnInit {

    offertsReceived = 0;

    constructor(private authService: AuthService, private offertService: OffertService) { }

    ngOnInit() {
        if (this.isLoggedIn()) {
            this.offertService.getHoldingOffertsCount()
                .subscribe(
                    data => {
                        this.offertsReceived = data.result;
                    }
                );
        }
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    logOut() {
        this.authService.logout();
    }
}