import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
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
    styles: [`
        .btn-upload {
            border-style: dashed;
            border-color: #080808;
            height: 80px;
        }

        .image-placeholder {
            max-height: 80px;
            width: 100%;
            background: #eee;
            border-radius: 5px;
        }

        img {
            height: 80px;
            max-width: 80px;
            object-fit: contain;
        }
    `],
    templateUrl: './settings-admin.component.html'
})
export class SettingsAdminComponent implements OnInit {

    @ViewChild('closeModal') closeModal: ElementRef;
    @ViewChild('certificateFile') certificateFile: ElementRef;

    isPro: Boolean;
    certificates = [];
    categories = [];
    selectedCategories = [];

    userInfo: FormGroup;
    userAvatar: any;

    changeMail: FormGroup;
    changePassword: FormGroup;
    certificateTitle = '';
    certificateCategory = null;

    constructor(private userService: UserService, private categoryService: CategoryService, private mapService: MapService, private imageService: ImageService, private router: Router) { }

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

        this.userService.getUserCertificates()
            .subscribe(data => this.certificates = data.result);

        this.categoryService.getCategories()
            .subscribe(
                data => {
                    this.categories = data.result;
                });

        this.userService.getUserSelectedCategories()
            .subscribe(
                data => {
                    this.selectedCategories = data.result;
                }
            );

        this.userService.getAvatar('')
            .subscribe(
                data => this.userAvatar = this.imageService.getBase64Image(data._body),
                error => console.log(error)
            );
    }

    enablePro(isEnabled: Boolean) {
        this.isPro = isEnabled;
        this.userService.enableUserNotification(isEnabled).subscribe(
            data => console.log(data.result)
        );
    }

    onSelectCategory(category: any, event: any) {
        let isSelected = event.srcElement.checked;
        if (isSelected == true) {
            this.selectedCategories.push(category);
        } else {
            let categoryIndex = this.selectedCategories.indexOf(category);
            if (categoryIndex > -1) {
                this.selectedCategories.splice(categoryIndex, 1);
            }
        }

        this.userService.setUserCategory(category._id, isSelected)
            .subscribe(
                data => console.log(data)
            );
    }

    isCategorySelected(categoryId): Boolean {
        for (const categoryElement of this.selectedCategories) {
            if (categoryElement._id === categoryId) {
                return true;
            }
        }
        return false;
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

    uploadCertificate(fileInput) {
        this.imageService.uploadCertificate(fileInput.target.files[0], this.certificateTitle, this.certificateCategory)
            .subscribe(
                data => {
                    this.certificateTitle = '';
                    this.certificateFile.nativeElement.value = '';
                    this.certificates.push(data.result);
                },
                error => console.log(error)
            );

        this.closeModal.nativeElement.click();
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

    certificateRemoved(certificate) {
        let certificateIndex = this.certificates.indexOf(certificate);
        if (certificateIndex > -1) {
            this.certificates.splice(certificateIndex, 1);
        }
    }

    uploadImg(inputEvent) {
        var fileReader = new FileReader();

        fileReader.onload = (event: any) => {
            this.userAvatar = {
                url: event.target.result,
                file: inputEvent.target.files[0]
            };

            this.userService.uploadAvatar(this.userAvatar)
                .subscribe(
                    data => console.log(data)
                );
        };

        fileReader.readAsDataURL(inputEvent.target.files[0]);
    }
}