import { Component, OnInit } from "@angular/core";
import { ReviewService } from "./review.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ReviewModel } from "./review.model";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../auth/user.service";
import { ImageService } from "../image.service";
import { PaginationService } from "../pagination/pagination.service";

@Component({
    selector: 'my-review-list',
    styles: [`
        .bg-default {
            background: #f2f2f2;
        }

        .bottom-shadow {
            box-shadow: 0px 1px 7px #888888;
        }

        #avatar {
            height: 120px;
            width: 120px;
            object-fit: fill;
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

    readonly ITEMS_PER_PAGE = 1;
    totalItems = 0;
    currentPage = 1;

    reviews: [ReviewModel];
    userId: string;
    userInfo: User;
    userAvatar: any;

    constructor(private reviewService: ReviewService, private userService: UserService, private imageService: ImageService, private paginationService: PaginationService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.userId = this.route.snapshot.params['id'];



        this.userService.getUserInfo(this.userId)
            .subscribe(
                data => {
                    this.userInfo = data.result;
                },
                error => console.log(error)
            );

        this.userService.getAvatar('')
            .subscribe(
                data => this.userAvatar = this.imageService.getBase64Image(data._body)
            );

        this.reviewService.getReviewsCount(this.userId)
        .subscribe(
            data => this.totalItems = data.result
        );

        this.getReviews();
    }

    getReviews() {
        this.reviewService.getReviews(
            this.userId,
            this.paginationService.getLowerLimit(this.ITEMS_PER_PAGE,this.currentPage),
            this.ITEMS_PER_PAGE
        ).subscribe(
            data => {
                this.reviews = data.result;
            },
            error => console.log(error)
        );
    }

    pageChanged(event) {
        this.currentPage = event.page;
        this.getReviews();
    }

    shareExpert() {
        window.open("https://www.facebook.com/dialog/share?app_id=212024846252202&display=popup&description=This%20is%20the%20description%20parameter&quote=Cauti%20profesionalism%20si%20calitate?&href=https%3A%2F%2Fservicii.ro%2Fdocs%2F&redirect_uri=https%3A%2F%2Fwww.servicii.ro" + this.router.url);
    }
}