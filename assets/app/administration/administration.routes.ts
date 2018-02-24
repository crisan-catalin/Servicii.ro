import { Routes } from "@angular/router";
import { OffertListAdminComponent } from "./my-offerts/offert-list-admin.component";
import { SettingsAdminComponent } from "./settings/settings-admin.component";

export const ADMINISTRATION_ROUTES: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'oferte', component: OffertListAdminComponent },
    { path: 'setari', component: SettingsAdminComponent }
];