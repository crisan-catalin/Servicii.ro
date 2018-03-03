import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { MessagesComponent } from "./messages/messages.component";
import { AdListComponent } from "./ad/ad-list.component";
import { ReviewComponent } from "./reviews/review.component";
import { OffertListComponent } from "./offerts/offert-list.component";
import { AdAdminComponent } from "./administration/my-ads/ad-admin.component";
import { OffertListAdminComponent } from "./administration/my-offerts/offert-list-admin.component";
import { SettingsAdminComponent } from "./administration/settings/settings-admin.component";

import { ForgotPasswordComponent } from "./auth/forgot-password.component";
import { AdInfoComponent } from "./ad/ad-info.component";
import { AdNewComponent } from "./ad/ad-new.component";
import { ReviewListComponent } from "./reviews/review-list.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/anunturi', pathMatch: 'full' },

    { path: 'anunturi/anunt-nou/:id', component: AdNewComponent },
    { path: 'anunturi/anunt-nou', component: AdNewComponent },
    { path: 'anunturi/:categorie', component: AdListComponent },
    { path: 'anunturi/:categorie/:id', component: AdInfoComponent },
    { path: 'anunturi', component: AdListComponent },

    { path: 'review/:id', component: ReviewComponent },
    { path: 'review/:id', component: ReviewListComponent },
    { path: 'oferte', component: OffertListComponent },

    { path: 'auth/new-password', component: ForgotPasswordComponent },
    { path: 'auth', component: AuthenticationComponent },

    { path: 'my-account/oferte', component: OffertListAdminComponent },
    { path: 'my-account/setari', component: SettingsAdminComponent },
    { path: 'my-account', component: AdAdminComponent },
    { path: 'my-account', component: AdministrationComponent },
    //TODO: Redirect to index page with map
    { path: '*', redirectTo: '/anunturi' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);