import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SearchService } from "./search.service";
import { SearchModel } from "./search.model";
import { CategoryService } from "../ad/category.service";

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

    searchForm: FormGroup;
    categories = [];

    constructor(private searchService: SearchService, private categoryService: CategoryService) { }

    ngOnInit() {
        this.searchForm = new FormGroup({
            serviceName: new FormControl(null, Validators.required),
            categoryName: new FormControl(null, Validators.required),
            locationName: new FormControl(null, Validators.required),
        });
        this.getCategories();
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

        this.searchService.filterdAds(
            new SearchModel(searchJson.serviceName, searchJson.categoryName, searchJson.locationName))
            .subscribe();
    }

}