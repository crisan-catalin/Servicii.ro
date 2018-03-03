import { Component, OnInit, AfterContentInit } from "@angular/core";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OffertModel } from "../offerts/offert.model";
import { OffertService } from "../offerts/offert.service";

@Component({
    selector: "my-ad-info",
    styles: [``],
    templateUrl: './ad-info.component.html'
})
export class AdInfoComponent implements OnInit {

    offertForm: FormGroup;

    ad: AdModel;
    phone: String;
    distance: Number;
    remainingTime: String;
    isMobile: Boolean;

    constructor(
        private adService: AdService,
        private authService: AuthService,
        private offertService: OffertService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        let adId = this.route.snapshot.params['id'];

        if (adId !== undefined) {
            this.adService.getAd(adId)
                .subscribe(
                    data => {
                        this.ad = data.result;
                        this.phone = data.result.userId.phone;
                        this.remainingTime = this.adService.getRemainingTime(String(this.ad.expirationDate));
                        this.getDistance();
                        this.isMobile = this.authService.isMobileDevice();
                    },
                    error => this.router.navigateByUrl('/')
                )

            this.offertForm = new FormGroup({
                solution: new FormControl(null, Validators.required),
                price: new FormControl(null, Validators.required),
                currency: new FormControl(null, Validators.required)
            });
        } else {
            this.router.navigateByUrl('/');
        }
    }

    getDistance() {
        this.adService.getDistanceTo(this.ad.location,
            error => this.distance = null,
            calculatedDistance => this.distance = Math.trunc(calculatedDistance)
        );
    }

    onSendOffert() {
        this.authService.getUserId()
            .then((userId) => {
                let offert = new OffertModel(
                    this.ad.id,
                    String(userId),
                    undefined,
                    this.offertForm.value.solution,
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