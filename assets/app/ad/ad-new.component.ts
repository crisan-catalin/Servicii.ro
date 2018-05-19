import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdService } from "./ad.service";
import { AdModel } from "./ad.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MapService } from "../map/map.service";
import { CategoryService } from "./category.service";
import { ImageService } from "../image.service";

@Component({
    selector: 'my-ad-new',
    styles: [`
        textarea {
            border-radius: 0px !important;
        }

        img {
            height: 100%; 
            width: 100%; 
            object-fit: contain;
        }

        .image-placeholder {
            height: 100px;
            width: 100%;
            background: #eee;
            border-radius: 5px;
        }
    `],
    templateUrl: './ad-new.component.html'
})
export class AdNewComponent implements OnInit {

    DEFAULT_VALABILITY = 30;
    editedAdId = null;

    @Input() ad: AdModel;
    adForm: FormGroup;
    categories = [];
    adImages = [];

    constructor(private adService: AdService, private categoryService: CategoryService, private imageService: ImageService, private mapService: MapService, private router: Router, private route: ActivatedRoute) {
        this.editedAdId = route.snapshot.params['id'];
        if (this.editedAdId != null) {
            adService.getAdForEdit(this.editedAdId)
                .subscribe(
                    data => {
                        this.ad = new AdModel(
                            data.result._id,
                            null,
                            data.result.title,
                            data.result.description,
                            data.result.categoryId.name,
                            data.result.location,
                            data.result.expirationDate,
                            data.result.locationName
                        );

                        this.adForm.controls['title'].setValue(this.ad.title);
                        this.adForm.controls['description'].setValue(this.ad.description);
                        this.adForm.controls['category'].setValue(this.ad.categoryName);
                        this.adForm.controls['date'].setValue(this.DEFAULT_VALABILITY);

                        mapService.getLocationFromGeo(this.ad.location.lat, this.ad.location.lng)
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
            this.adService.getAdImages(this.editedAdId, 'other')
                .subscribe(
                    data => {
                        let images: any[] = JSON.parse(data._body);
                        for (const image of images) {
                            this.adImages.push({ url: this.imageService.getBase64Image(image.data) });
                        }
                    }
                );
        }
    }

    uploadImg(inputEvent) {
        if (this.editedAdId != null) {
            return;
        }

        var fileReader = new FileReader();

        fileReader.onload = (event: any) => {
            this.adImages.push({
                url: event.target.result,
                file: inputEvent.target.files[0]
            });
        };
        fileReader.readAsDataURL(inputEvent.target.files[0]);
    }

    ngOnInit() {
        this.adForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            category: new FormControl(null, Validators.required),
            location: new FormControl(null, Validators.required),
            date: new FormControl(null, Validators.required)
        });

        this.getCategories();
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(
                data => {
                    for (const category of data.result) {
                        this.categories.push(category);
                    }
                }
            )
    }

    onSendAd() {
        //Update existing ad
        if (this.ad != undefined && this.ad.id != undefined) {
            this.tryToUpdateAd();
        } else {
            this.tryToSaveAd();
        }
    }

    tryToSaveAd() {
        this.mapService.getGeoFromLocation(this.adForm.value.location)
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
        this.mapService.getGeoFromLocation(this.adForm.value.location)
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
            this.ad.id,
            undefined,
            this.adForm.value.title,
            this.adForm.value.description,
            this.adForm.value.category,
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
            this.adForm.value.category,
            location,
            this.getExpirationDate()
        );

        this.adService.saveAd(ad, this.adImages)
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