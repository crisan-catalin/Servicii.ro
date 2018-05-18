import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from "@angular/core";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OffertModel } from "../offerts/offert.model";
import { OffertService } from "../offerts/offert.service";
import { UserService } from "../auth/user.service";
import { ImageService } from "../image.service";

@Component({
    selector: "my-ad-info",
    styles: [``],
    templateUrl: './ad-info.component.html'
})
export class AdInfoComponent implements OnInit {

    @ViewChild('closeModal') closeModal: ElementRef;
    offertForm: FormGroup;

    ad: AdModel;
    adImages: any[] = [];

    distance: Number;
    remainingTime: String;
    isActive: Boolean = true;

    constructor(
        private adService: AdService,
        private userService: UserService,
        private offertService: OffertService,
        private authService: AuthService,
        private imageService: ImageService,
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
                );

            this.adService.getAdImages(adId, categoryName)
                .subscribe(
                    data => {
                        let images: any[] = JSON.parse(data._body);

                        for (const image of images) {
                            this.adImages.push(this.imageService.getBase64Image(image.data));
                        }
                    }
                );

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
        window.open("https://www.facebook.com/dialog/share?app_id=212024846252202&display=popup&description=This%20is%20the%20description%20parameter&quote=Cauti%20profesionalism%20si%20calitate?&href=https%3A%2F%2Fservicii.ro%2Fdocs%2F&redirect_uri=https%3A%2F%2Fwww.servicii.ro" + this.router.url);
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
        this.closeModal.nativeElement.click();

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

                this.offertService.addOffert(offert)
                    .subscribe(
                        data => { console.log(data) },
                        error => { console.log(error) }
                    );
            })
            .catch((error) => console.log(error));
    }
}