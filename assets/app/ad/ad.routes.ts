import { Routes } from "@angular/router";
import { AdListComponent } from "./ad-list.component";
import { AdInfoComponent } from "./ad-info.component";
import { AdNewComponent } from "./ad-new.component";

export const AD_ROUTES: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: ':categorie', component: AdListComponent },
    { path: ':categorie/:id', component: AdInfoComponent },
    { path: 'anunt-nou', component: AdNewComponent }
];