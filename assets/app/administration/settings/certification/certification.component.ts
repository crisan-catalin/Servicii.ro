import { Component, Input, OnInit } from "@angular/core";
import { CertificationModel } from "./certification.model";

@Component({
    selector: 'my-certification',
    template: `
        <div class="row vcenter certification margin-bottom-sm">
            <div class="col-xs-10 certification-title">
                <span>
                    <b>
                        <i class="fa fa-graduation-cap" aria-hidden="true"></i> {{certification}}
                    </b>
                </span>
            </div>
            <div class="col-xs-1 text-center">
                <button type="button" class="btn btn-close text-danger" (click)="onDelete()">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `,
    styles: [`
        .certification {
            height: 30px;
            border-style: dotted;
            border-color: #999999;
        }

        .certification div {
            padding-left: 2px !important;
        }

        .certification-title {
            white-space: nowrap;
            overflow: scroll;
        }

        .certification-title span {
            padding-top: 10px;
            display: inline-block;
            vertical-align: middle;
        }

        .certification-title::-webkit-scrollbar {
            width: 2px;
            background: transparent; /* make scrollbar transparent */
        }

        .btn-close {
            background-color: rgba(0,0,0,0);
        }
    `]
})
export class CertificationComponent {

    @Input() certification: string;

    onDelete() {
        //TODO: Create CertificationService and delete certification.id
    }
}