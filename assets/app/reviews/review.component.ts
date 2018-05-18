import { Component, Input, OnInit } from "@angular/core";
import { ReviewModel } from "./review.model";
import { ReviewService } from "./review.service";
import { UserService } from "../auth/user.service";
import { ImageService } from "../image.service";

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
            height: 60px;
            width: 100%;
            object-fit: contain;
        }

        .hidden-xs img {
            height: 120px;
            width: 120px;
            margin-top: 70px;
            object-fit: fill;
        }
    `],
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {

    @Input() review: ReviewModel;
    userAvatar: any;
    reviewImages: any[] = [];

    constructor(private reviewService: ReviewService, private userService: UserService, private imageService: ImageService) { }

    ngOnInit() {
        this.reviewService.getReviewImages(this.review.id)
            .subscribe(
                data => {
                    let images: any[] = JSON.parse(data._body);

                    for (const image of images) {
                        this.reviewImages.push(this.imageService.getBase64Image(image.data));
                    }
                }
            )

        this.userService.getAvatar(this.review.reviserUserId)
            .subscribe(
                data => {
                    this.userAvatar = this.imageService.getBase64Image(data._body);
                }
            )
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