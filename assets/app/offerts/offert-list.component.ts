import { Component, OnInit } from "@angular/core";
import { OffertService } from "./offert.service";
import { OffertModel } from "./offert.model";

@Component({
    selector: 'my-offert-list',
    styles: [`
        table td + td {
            border-left: 1px solid #d9d9d9;
        }

        table {
            border: 1px solid #d9d9d9
        }

        /* Anunt */
        .bolder {
            font-weight: bolder;
        }

        .btn-style {
            border: 1px solid #CCC;
            padding: 5px;
            border-radius: 4px;
        }

        .stars {
            padding-left: 5px;
        }

        .star {
            color: yellow;
            text-shadow: 0px 0px 2px #000;
        }

        .star .fa.fa-star-o {
            color: black;
            text-shadow: 0px 0px 0px #000;
        }

        /* Media query */
        @media (min-width: 768px) {
            .btn-style {
                margin-bottom: 10px;
            }
        }

        @media (max-width: 768px) {
            td .row .col-xs-10 div {
                padding-top: 10px;
            }
        }
    `],
    templateUrl: './offert-list.component.html'
})
export class OffertListComponent implements OnInit {

    offerts: OffertModel[];

    constructor(private offertService: OffertService) { }

    ngOnInit() {
        this.offertService.getReceivedOfferts()
            .subscribe(
                data => {
                    this.offerts = data.result;
                },
                error => console.log(error)
            );
    }
}