import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SearchService } from "./search.service";
import { SearchModel } from "./search.model";
import { CategoryService } from "../ad/category.service";
import { Route, Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "my-search",
    styles: [`
        .header-form {
            padding: 20px 10px 10px 10px;
        }

        #sort-list {
            padding-top: 10px;
        }
    `],
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {

    ADS_PATH = "/anunturi";

    searchForm: FormGroup;
    categories = [];

    constructor(private searchService: SearchService, private categoryService: CategoryService, private router: Router) {
        router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                if (val.url == this.ADS_PATH) {
                    this.onSearch();
                }
            }
        })
    }

    ngOnInit() {
        this.searchForm = new FormGroup({
            serviceName: new FormControl(null, Validators.required),
            categoryName: new FormControl(null, Validators.required),
            locationName: new FormControl(null, Validators.required),
        });
        this.getCategories();

        this.searchService.adsListInitialized.subscribe(() => this.onSearch());
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(
                data => {
                    for (const category of data.result) {
                        this.categories.push(category);
                    }
                }
            );
    }

    onSearch() {
        let searchJson = this.searchForm.value;

        let urlPath = this.router.url;
        if (!urlPath.startsWith(this.ADS_PATH)) {
            if (!searchJson.serviceName && !searchJson.categoryName && !searchJson.locationName) {
                return;
            }

            this.router.navigateByUrl(this.ADS_PATH)
            return;
        }

        this.searchService.filterdAds(new SearchModel(searchJson.serviceName, searchJson.categoryName, searchJson.locationName))
            .subscribe();
    }

}