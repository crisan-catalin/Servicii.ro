import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AdListComponent } from "./ad/ad-list.component";
import { ReviewComponent } from "./reviews/review.component";
import { OffertListComponent } from "./offerts/offert-list.component";
import { AdAdminComponent } from "./administration/my-ads/ad-admin.component";
import { OffertListAdminComponent } from "./administration/my-offerts/offert-list-admin.component";
import { SettingsAdminComponent } from "./administration/settings/settings-admin.component";

import { AUTH_ROUTES } from "./auth/auth.routes";
import { AD_ROUTES } from "./ad/ad.routes";
import { ADMINISTRATION_ROUTES } from "./administration/administration.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/anunturi', pathMatch: 'full' },
    { path: 'anunturi', component: AdListComponent, children: AD_ROUTES },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'review/:id', component: ReviewComponent },
    { path: 'oferte', component: OffertListComponent },
    { path: 'my-account', component: AdAdminComponent, children: ADMINISTRATION_ROUTES },
    // Redirect to index page with map
    { path: '*', redirectTo: '/anunturi' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);