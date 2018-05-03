import { Component, OnInit, AfterContentInit } from "@angular/core";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OffertModel } from "../offerts/offert.model";
import { OffertService } from "../offerts/offert.service";
import { UserService } from "../auth/user.service";

@Component({
    selector: "my-ad-info",
    styles: [``],
    templateUrl: './ad-info.component.html'
})
export class AdInfoComponent implements OnInit {

    offertForm: FormGroup;

    ad: AdModel;
    distance: Number;
    remainingTime: String;
    isActive: Boolean = true;

    constructor(
        private adService: AdService,
        private userService: UserService,
        private offertService: OffertService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        let adId = this.route.snapshot.params['id'];
        let categoryName = this.route.snapshot.params['categorie'];

        if (adId !== undefined) {
            this.adService.getAd(adId, categoryName)
                .subscribe(
                    data => {
                        this.ad = data.result;
                        this.ad.id = adId;

                        console.log(data.result.isActive != undefined)
                        if (data.result.isActive != undefined) {
                            this.isActive = data.result.isActive;
                            return;
                        }

                        this.remainingTime = this.adService.getRemainingTime(String(this.ad.expirationDate));
                        this.getDistance();
                    },
                    error => this.router.navigateByUrl('/')
                )

            this.offertForm = new FormGroup({
                description: new FormControl(null, Validators.required),
                price: new FormControl(null, Validators.required),
                currency: new FormControl(null, Validators.required)
            });
        } else {
            this.router.navigateByUrl('/');
        }
    }

    shareAd() {
        window.open("https://www.facebook.com/sharer/sharer.php?u=localhost:3000" + this.router.url);
    }

    checkIfLogged() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/auth');
        }
    }

    getDistance() {
        this.adService.getDistanceTo(this.ad.location,
            error => this.distance = null,
            calculatedDistance => this.distance = Math.round(calculatedDistance)
        );
    }

    onSendOffert() {
        this.userService.getUserId()
            .then((userId) => {
                let offert = new OffertModel(
                    undefined,
                    this.ad.id,
                    String(userId),
                    undefined,
                    this.offertForm.value.description,
                    this.offertForm.value.price,
                    this.offertForm.value.currency,
                    undefined
                );
                //TODO: implement it
                this.offertService.addOffert(offert)
                    .subscribe(
                        data => { console.log(data) },
                        error => { console.log(error) }
                    );
            })
            .catch((error) => console.log(error));
    }
}