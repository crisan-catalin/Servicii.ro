import { Component, OnInit } from "@angular/core";
import { ReviewService } from "./review.service";
import { ActivatedRoute } from "@angular/router";
import { ReviewModel } from "./review.model";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'my-review-list',
    styles: [`
        .bg-default {
            background: #f2f2f2;
        }

        .bottom-shadow {
            box-shadow: 0px 1px 7px #888888;
        }

        @media (max-width: 768px){
            #text-center{
              text-align:center;
            }
        }
    `],
    templateUrl: './review-list.component.html'
})
export class ReviewListComponent implements OnInit {

    reviews: [ReviewModel];
    userInfo: User;

    constructor(private reviewService: ReviewService, private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit() {
        let userId = this.route.snapshot.params['id'];

        this.authService.getUserInfo(userId)
            .subscribe(
                data => { this.userInfo = data.result; },
                error => console.log(error)
            );

        this.reviewService.getReviews(userId)
            .subscribe(
                data => {
                    this.reviews = data.result;
                    console.log(data);
                },
                error => console.log(error)
            );
    }
}