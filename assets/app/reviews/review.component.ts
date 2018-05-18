import { Component, Input, OnInit } from "@angular/core";
import { ReviewModel } from "./review.model";
import { ReviewService } from "./review.service";

@Component({
    selector: 'my-review',
    styles: [`
        .center-element {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
        }

        .center-element button {
            border-radius: 0px;
            border: 1px solid black;
        }

        .col-sm-6 img {
            visibility: visible;
            height: 60px;
            width: 100%;
            object-fit: contain;
        }
    `],
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {

    @Input() review: ReviewModel;
    reviewImages: any[] = [];

    constructor(private reviewService: ReviewService) { }

    ngOnInit() {
        this.reviewService.getReviewImages(this.review.id)
            .subscribe(
                data => {
                    let images: any[] = JSON.parse(data._body);

                    for (const image of images) {
                        this.reviewImages.push(this.getBase64Image(image.data));
                    }
                }
            )
    }

    getBase64Image(data): string {
        var base64 = btoa(
            new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return 'data:image/png;base64,' + base64;
    }

    getRatingAsText(rate) {
        if (rate == 1) {
            return "Nemultumit";
        } else if (rate == 2) {
            return "Neutru";
        } else if (rate == 3) {
            return "Multumit";
        } else {
            return "Foarte multumit";
        }
    }
}