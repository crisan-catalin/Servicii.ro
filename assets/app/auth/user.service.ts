import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { SERVER_PATH } from "../ad/ad.service";
import { ErrorService } from "../error/error.service";
import { User } from "./user.model";

var jwt = require('jsonwebtoken');

@Injectable()
export class UserService {

    constructor(private http: Http, private errorService: ErrorService) { }

    getUserId() {
        return new Promise(function (resolve, reject) {
            let userToken = localStorage.getItem('token');
            jwt.verify(userToken, 'secret_token', function (err, decoded) {
                return err ? reject(err) : resolve(decoded.user._id);
            });
        });
    }

    getUserInfo(userId: String) {
        return this.http.get(SERVER_PATH + '/user/info/' + userId)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    getUserSettingsInfo() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(SERVER_PATH + '/my-account/setari/user-info' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    getUserCertificates() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(SERVER_PATH + '/my-account/setari/user-info/certificate' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    deleteCertificate(id) {
        const token = localStorage.getItem('token')
            ? 'token=' + localStorage.getItem('token')
            : '';

        return this.http.delete(SERVER_PATH + '/my-account/setari/user-info/certificate?id=' + id + '&' + token, )
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getUserSelectedCategories() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(SERVER_PATH + '/my-account/setari/user-info/categories' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    setUserCategory(categoryId, isSelected) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let body = JSON.stringify({ categoryId: categoryId, isSelected: isSelected });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch(SERVER_PATH + '/my-account/setari/user-info/categories' + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    enableUserNotification(isEnabled) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        let body = JSON.stringify({ isEnabled: isEnabled });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch(SERVER_PATH + '/my-account/setari/user-info/notification' + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    updateUserSettingsInfo(user: User) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch(SERVER_PATH + '/my-account/setari/user-info' + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    updateUserPassword(password: String) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({ password: password });

        return this.http.patch(SERVER_PATH + '/my-account/setari/password' + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    updateUserEmail(email: String, password: String) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({ email: email, password: password });

        return this.http.patch(SERVER_PATH + '/my-account/setari/email' + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    deleteAccount() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.delete(SERVER_PATH + '/my-account/setari/delete' + token)
            .map((response: Response) => {
                localStorage.clear();
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error)
            });
    }

    uploadAvatar(image: any) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        let formData = new FormData();
        formData.append('userImage', image.file, image.file.name);

        return this.http.post(SERVER_PATH + '/user/info/avatar' + token, formData)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => { return Observable.throw(error) });
    }

    getAvatar(userId: String) {
        const userIdParam = userId.length > 0 ? '?userId=' + userId : '';

        const token = localStorage.getItem('token')
            ? (userIdParam != '' ? '&token=' : '?token=') + localStorage.getItem('token')
            : '';

        let options = new RequestOptions({ responseType: ResponseContentType.ArrayBuffer });

        return this.http.get(SERVER_PATH + '/user/info/avatar' + userIdParam + token, options)
            .catch((error: Response) => { return Observable.throw(error) });
    }
}