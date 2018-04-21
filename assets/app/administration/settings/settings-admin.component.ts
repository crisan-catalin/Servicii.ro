import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { MapService } from "../../map/map.service";
import { UserService } from "../../auth/user.service";
import { User } from "../../auth/user.model";
import { Router } from "@angular/router";
import { inspectNativeElement } from "@angular/platform-browser/src/dom/debug/ng_probe";
import { CategoryService } from "../../ad/category.service";
import { ImageService } from "../../image.service";
import { SERVER_PATH } from "../../offerts/offert.service";

@Component({
    selector: 'my-settings-admin',
    styles: [``],
    templateUrl: './settings-admin.component.html'
})
export class SettingsAdminComponent implements OnInit {

    isPro: Boolean;
    certificates = [];
    categoriesName = [];
    selectedCategories = {};

    userInfo: FormGroup;
    changeMail: FormGroup;
    changePassword: FormGroup;

    constructor(private userService: UserService, private categoryService: CategoryService, private mapService: MapService, private imageService: ImageService, private router: Router) {
        this.setCategoriesName();
    }

    ngOnInit() {
        //TODO: Change user avatar
        this.userInfo = new FormGroup({
            name: new FormControl(null),
            phone: new FormControl(null),
            address: new FormControl(null),
            range: new FormControl(null),
            description: new FormControl(null),
            experienceYears: new FormControl(null)
        });

        this.changeMail = new FormGroup({
            password: new FormControl(null, Validators.required),
            mail: new FormControl(null, Validators.required)
        });

        this.changePassword = new FormGroup({
            newPassword: new FormControl(null, Validators.required),
            repeatPassword: new FormControl(null, Validators.required)
        });

        this.userService.getUserSettingsInfo()
            .subscribe(
                data => {
                    let user = data.result;
                    this.userInfo.controls['name'].setValue(user.name);
                    this.userInfo.controls['phone'].setValue(user.phone);

                    this.isPro = user.notificationEnabled;
                    this.certificates = user.certificates;
                    this.userInfo.controls['description'].setValue(user.biography);
                    this.userInfo.controls['range'].setValue(user.notificationRange);
                    this.userInfo.controls['experienceYears'].setValue(user.experienceYears);

                    this.mapService.getLocationFromGeo(user.location.lat, user.location.lng)
                        .subscribe(
                            data => {
                                let address = data.results[0].formatted_address;
                                if (address) {
                                    this.userInfo.controls['address'].setValue(address);
                                }
                            }
                        );
                },
                error => console.log(error)
            );

        this.categoryService.getCategories()
            .subscribe(
                data => {
                    for (const category of data.result) {
                        this.categoriesName.push(category.name);
                    }
                });

        this.userService.getUserSelectedCategories()
            .subscribe(
                data => {
                    let userSelectedCategories = data.result;
                    for (const categoryName of userSelectedCategories) {
                        this.selectedCategories[categoryName] = true;
                    }
                }
            );
    }

    enablePro(isEnabled: Boolean) {
        this.isPro = isEnabled;
        this.userService.enableUserNotification(isEnabled).subscribe(
            data => console.log(data.result)
        );
    }

    onSelectCategory(event: any) {
        let category = event.srcElement.nextSibling.data;
        category = String(category).trim();
        this.selectedCategories[category] = !this.selectedCategories[category];

        this.userService.setUserCategory(category, this.selectedCategories[category])
            .subscribe(
                data => console.log(data)
            );
    }

    setCategoriesName() {
        this.categoriesName = Object.keys(this.selectedCategories);
    }

    isCategorySelected(categoryName): Boolean {
        return this.selectedCategories[categoryName];
    }

    onChangeUserInfo() {
        if (this.userInfo.value.address) {
            this.mapService.getGeoFromLocation(this.userInfo.value.address)
                .subscribe(
                    data => {
                        if (data.results[0].geometry.location) {
                            let user = new User(
                                undefined,
                                undefined,
                                this.userInfo.value.name,
                                this.userInfo.value.phone,
                                data.results[0].geometry.location,
                                this.userInfo.value.experienceYears,
                                this.userInfo.value.description,
                                this.userInfo.value.range
                            );
                            this.userService.updateUserSettingsInfo(user)
                                .subscribe(
                                    data => console.log(data),
                                    error => console.log(error)
                                );
                        }
                    }
                )
        } else {
            let user = new User(
                undefined,
                undefined,
                this.userInfo.value.name,
                this.userInfo.value.phone,
                undefined,
                this.userInfo.value.experienceYears,
                this.userInfo.value.description,
                this.userInfo.value.range
            );
            this.userService.updateUserSettingsInfo(user)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
    }

    fileChange(fileInput) {
        this.imageService.uploadCertificate(fileInput.target.files[0])
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
    }

    onChangeMail() {
        let emailJson = this.changeMail.value;

        this.userService.updateUserEmail(emailJson.mail, emailJson.password)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
    }

    onChangePassword() {
        let passwordJson = this.changePassword.value;

        if (passwordJson.newPassword == passwordJson.repeatPassword) {
            this.userService.updateUserPassword(passwordJson.newPassword)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        } else {
            console.log('Passwords are not the same.');
        }
    }

    onDeleteAccount() {
        this.userService.deleteAccount()
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            );
    }
}