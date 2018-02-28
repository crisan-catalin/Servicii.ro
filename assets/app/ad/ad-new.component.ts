import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { Router, ActivatedRoute } from "@angular/router";
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

    @Input() ad: AdModel;
    adId: string;
    adForm: FormGroup;

    constructor(private adService: AdService, private mapService: MapService, private router: Router, private route: ActivatedRoute) {
        let editedAdId = route.snapshot.params['id'];
        if (editedAdId) {
            adService.getAd(editedAdId)
                .subscribe(
                    data => {
                        this.ad = data.result;
                        this.adId = data.result._id;
                        this.adForm.controls['title'].setValue(this.ad.title);
                        this.adForm.controls['description'].setValue(this.ad.description);
                        this.adForm.controls['category'].setValue(this.ad.categoryName);
                        
                        mapService.getGeoToLocation(this.ad.location.lat, this.ad.location.lng)
                            .subscribe(
                                data => {
                                    let address = data.results[0].formatted_address;
                                    if (address) {
                                        this.ad.locationName = address;
                                        this.adForm.controls['location'].setValue(this.ad.location);
                                    }
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                    },
                    error => console.log(error)
                );
        }
    }

    ngOnInit() {
        this.adForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            category: new FormControl(null, Validators.required),
            location: new FormControl(null, Validators.required),
            date: new FormControl(null, Validators.required)
        });
    }

    onSendAd() {
        //Update existing ad
        if (this.adId) {
            this.tryToUpdateAd();
        } else {
            this.tryToSaveAd();
        }
    }

    tryToSaveAd() {
        this.mapService.getLocationToGeo(this.adForm.value.location)
            .subscribe(
                data => {
                    if (data.results[0].geometry.location) {
                        this.saveAd(data.results[0].geometry.location)
                    }
                },
                error => { console.log(error) }
            );
    }

    tryToUpdateAd() {
        this.mapService.getLocationToGeo(this.adForm.value.location)
            .subscribe(
                data => {
                    if (data.results[0].geometry.location) {
                        this.updateAd(data.results[0].geometry.location)
                    }
                },
                error => { console.log(error) }
            );
    }

    updateAd(location: any) {
        const updatedAd = new AdModel(
            this.adId,
            undefined,
            this.adForm.value.title,
            this.adForm.value.description,
            // this.adForm.value.category,
            'Electrocasnice',
            location,
            this.getExpirationDate()
        );

        this.adService.updateAd(updatedAd)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
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