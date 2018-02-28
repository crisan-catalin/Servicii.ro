import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { Router } from "@angular/router";
import { MapService } from "../map/map.service";

@Component({
    selector: 'my-ad-new',
    styles: [`
        textarea {
            border-radius: 0px !important;
        }
    `],
    templateUrl: './ad-new.component.html'
})
export class AdNewComponent implements OnInit {

    adForm: FormGroup;

    constructor(private adService: AdService, private mapService: MapService, private router: Router) { }

    ngOnInit() {
        this.adForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            category: new FormControl(null, Validators.required),
            location: new FormControl(null, Validators.required),
            date: new FormControl(null, Validators.required)
        });
    }

    onNewAd() {
        this.tryToSaveAd();
    }

    tryToSaveAd() {
        this.mapService.getUserLocation(this.adForm.value.location)
            .subscribe(
                data => {
                    if (data.results[0].geometry.location) {
                        this.saveAd(data.results[0].geometry.location)
                    }
                },
                error => { }
            );
    }

    saveAd(location: any) {
        const ad = new AdModel(
            undefined,
            undefined,
            this.adForm.value.title,
            this.adForm.value.description,
            // this.adForm.value.category,
            'Electrocasnice',
            location,
            this.getExpirationDate()
        );

        this.adService.saveAd(ad)
            .subscribe(
                data => { this.router.navigateByUrl('/'); },
                error => { console.log(error); }
            );
    }

    getExpirationDate(): Date {
        let adValabilityDays = this.adForm.value.date;
        var date = new Date();
        date.setDate(date.getDate() + parseInt(adValabilityDays));
        return date;
    }
}