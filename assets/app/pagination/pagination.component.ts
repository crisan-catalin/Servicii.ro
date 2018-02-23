import {Component} from "@angular/core";

@Component({
    selector: 'my-pagination',
    styles: [`
        .pagination {
            display: inline-block;
        }

        .pagination a {
            color: black;
            float: left;
            padding: 8px 16px;
        }

        .pagination a.active {
            background-color: #4CAF50;
            color: white;
        }

        .pagination a:hover:not(.active) {
            background-color: #ddd;
        }

        .pagination a:hover:not(.active):nth-last-child(2) {
            background: #fff;
        }

        .row .pagination {
            margin-bottom: 0px;
        }
    `],
    template: `
        <div class="container">
            <div class="row text-center">
                <div class="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#" *ngFor="let page of pages">{{page}}</a>
                    <!--<a class="active" href="#">2</a>-->
                    <a href="#">&raquo;</a>
                </div>
            </div>
        </div>
    `
})
export class PaginationComponent {
    pages = [1, 2, 3, "...", 10];
}