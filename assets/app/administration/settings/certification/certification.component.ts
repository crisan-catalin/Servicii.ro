import { Component, Input } from "@angular/core";
import { CertificationModel } from "./certification.model";

@Component({
    selector: 'my-certification',
    template: `
        <div class="row bg-info vcenter certification">
            <div class="col-xs-10 certification-title">
                <span>{{certification?.name}}</span>
            </div>
            <div class="col-xs-1 pull-right">
                <button type="button" class="close" (click)="onDelete()">
                    <span aria-hidden="true" class="text-danger">&times;</span>
                    <span class="sr-only">Close</span>
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

        .certification-title {
            white-space: nowrap;
            overflow: scroll;
        }
    `]
})
export class CertificationComponent {

    @Input() certification: CertificationModel;

    onDelete() {
        //TODO: Create CertificationService and delete certification.id
    }
}