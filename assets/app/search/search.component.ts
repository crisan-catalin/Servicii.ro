import {Component, OnInit} from "@angular/core";

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
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-10 col-md-offset-1 col-sm-12">
                    <form class="header-form">
                        <div class="row">
                            <!--  Cauta servicii -->
                            <div class="col-sm-12 col-md-4 sm-padding">
                                <input type="text" class="form-control text-center .sm-padding focus"
                                       placeholder="Ce servicii cauti?" autofocus>
                            </div>
                            <!-- Categorii -->
                            <div class="col-sm-12 col-md-2 sm-padding">
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle form-control" type="button"
                                            data-toggle="dropdown">Categorie
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li *ngFor="let category of categories">
                                            <a href="#">{{category}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--  Locatie -->
                            <div class="col-sm-12 col-md-2 sm-padding">
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon1"><i class="fa  fa-map-marker"></i></span>
                                    <input type="text" class="form-control text-center" placeholder="Locatie"
                                           aria-describedby="basic-addon1">
                                </div>
                            </div>
                            <!--  Cauta -->
                            <div class="col-sm-12 col-md-4 sm-padding">
                                <button type="submit" class="btn btn-success form-control"><i class="fa fa-search"></i>
                                    Cauta servicii
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
})

export class SearchComponent implements OnInit {

    categories: string[];

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.categories = ["Tamplar", "Instalator", "Sofer", "Bucatar", "Electrician"];
    }

}