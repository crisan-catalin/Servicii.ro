import { Component, OnInit } from "@angular/core";
import { ReviewService } from "./review.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ReviewModel } from "./review.model";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../auth/user.service";

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

    constructor(private reviewService: ReviewService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        let userId = this.route.snapshot.params['id'];

        this.userService.getUserInfo(userId)
            .subscribe(
                data => {
                    this.userInfo = data.result;
                },
                error => console.log(error)
            );

        this.reviewService.getReviews(userId)
            .subscribe(
                data => {
                    this.reviews = data.result;
                },
                error => console.log(error)
            );
    }

    shareExpert() {
        window.open("https://www.facebook.com/dialog/share?app_id=212024846252202&display=popup&description=This%20is%20the%20description%20parameter&quote=Cauti%20profesionalism%20si%20calitate?&href=https%3A%2F%2Fservicii.ro%2Fdocs%2F&redirect_uri=https%3A%2F%2Fwww.servicii.ro" + this.router.url);
    }
}