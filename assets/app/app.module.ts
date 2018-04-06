import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./error/error.component";
import { ErrorService } from "./error/error.service";
import { MapComponent } from "./map.component";
import { SearchComponent } from "./search/search.component";
import { AdInfoComponent } from "./ad/ad-info.component";
import { AdComponent } from "./ad/ad.component";
import { AdListComponent } from "./ad/ad-list.component";
import { AdNewComponent } from "./ad/ad-new.component";
import { OffertListComponent } from "./offerts/offert-list.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { ReviewComponent } from "./reviews/review.component";
import { ReviewListComponent } from "./reviews/review-list.component";
import { AdAdminComponent } from "./administration/my-ads/ad-admin.component";
import { AdListAdminComponent } from "./administration/my-ads/ad-list-admin.component";
import { OffertAcceptedAdminComponent } from "./administration/my-offerts/offert-accepted-admin.component";
import { OffertHoldingAdminComponent } from "./administration/my-offerts/offert-holding-admin.component";
import { OffertListAdminComponent } from "./administration/my-offerts/offert-list-admin.component";
import { SettingsAdminComponent } from "./administration/settings/settings-admin.component";
import { AdministrationComponent } from "./administration/administration.component";
import { AdService } from "./ad/ad.service";
import { ForgotPasswordComponent } from "./auth/forgot-password.component";
import { MapBoxComponent } from './map/mapbox.component';
import { MapService } from './map/map.service';
import { AgmCoreModule } from '@agm/core';
import { OffertService } from './offerts/offert.service';
import { ReviewService } from './reviews/review.service';
import { OffertComponent } from './offerts/offert.component';
import { UserService } from './auth/user.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SearchService } from './search/search.service';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,

        AuthenticationComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ForgotPasswordComponent,

        HeaderComponent,
        FooterComponent,

        SearchComponent,
        PaginationComponent,

        AdInfoComponent,
        AdComponent,
        AdListComponent,
        AdNewComponent,

        OffertComponent,
        OffertListComponent,

        ReviewComponent,
        ReviewListComponent,

        AdAdminComponent,
        AdListAdminComponent,
        OffertAcceptedAdminComponent,
        OffertHoldingAdminComponent,
        OffertListAdminComponent,
        SettingsAdminComponent,
        AdministrationComponent,

        MapBoxComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        BsDropdownModule.forRoot(),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyC90g-XLGfZmm7wUapbQ_K78ujXTXqgV8U' })
    ],
    providers: [AuthService, UserService, ErrorService, AdService, OffertService, ReviewService, SearchService, MapService],
    bootstrap: [AppComponent]
})
export class AppModule {

}