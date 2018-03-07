import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { MapService } from "../../map/map.service";
import { UserService } from "../../auth/user.service";
import { User } from "../../auth/user.model";

@Component({
    selector: 'my-settings-admin',
    styles: [``],
    templateUrl: './settings-admin.component.html'
})
export class SettingsAdminComponent implements OnInit {

    userInfo: FormGroup;
    changeMail: FormGroup;
    changePassword: FormGroup;

    constructor(private userService: UserService, private mapService: MapService) { }

    ngOnInit() {
        //TODO: Change user avatar
        this.userInfo = new FormGroup({
            name: new FormControl(null),
            phone: new FormControl(null),
            address: new FormControl(null),
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
                    let user = data.result
                    this.userInfo.controls['name'].setValue(user.name);
                    this.userInfo.controls['phone'].setValue(user.phone);
                    this.userInfo.controls['description'].setValue(user.biography);
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
                                this.userInfo.value.description
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
                this.userInfo.value.description
            );
            this.userService.updateUserSettingsInfo(user)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
    }

    onChangeMail() {
        console.log(this.changeMail.value);
    }

    onChangePassword() {
        console.log(this.changePassword.value);
    }

    onDeleteAccount() {

    }
}