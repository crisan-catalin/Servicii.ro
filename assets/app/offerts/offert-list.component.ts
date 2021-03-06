import { Component, OnInit, ViewChild } from "@angular/core";
import { OffertService } from "./offert.service";
import { ReviewModel } from "../reviews/review.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ReviewService } from "../reviews/review.service";
import { OffertAcceptedComponent } from "./offert-accepted.component";
import { OffertHoldingComponent } from "./offert-holding.component";
import { OffertAcceptedModel } from "./offert-accepted.model";
import { OffertHoldingModel } from "./offert-holding.model";

@Component({
  selector: "my-offert-list",
  styles: [
    `
      table td + td {
        border-left: 1px solid #d9d9d9;
      }

      table {
        border: 1px solid #d9d9d9;
      }

      /* Anunt */
      .bolder {
        font-weight: bolder;
      }

      .btn-style {
        border: 1px solid #ccc;
        padding: 5px;
        border-radius: 4px;
      }

      .image-placeholder {
        height: 100px;
        width: 100%;
        background: #eee;
        border-radius: 5px;
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
    `
  ],
  templateUrl: "./offert-list.component.html"
})
export class OffertListComponent implements OnInit {
  MAX_RATE: number = 5;
  rate: number = 0;

  holdingOfferts: OffertHoldingModel[];
  acceptedOfferts: OffertAcceptedModel[];

  reviewForm: FormGroup;
  reviewModel: ReviewModel;
  reviewImages = [];

  constructor(
    private offertService: OffertService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.reviewForm = new FormGroup({
      reviewTitle: new FormControl(null, Validators.required),
      qualityRate: new FormControl(null, Validators.required),
      professionalismRate: new FormControl(null, Validators.required),
      punctualityRate: new FormControl(null, Validators.required),
      reviewDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ])
    });

    this.offertService.getHoldingOfferts().subscribe(data => {
      this.holdingOfferts = data.result;
    });

    this.offertService.getAcceptedOfferts().subscribe(data => {
      this.acceptedOfferts = data.result;
    });
  }

  onOffertAproved(offert: OffertHoldingModel) {
    let offertIndex = this.holdingOfferts.indexOf(offert);
    if (offertIndex > -1) {
      let aprovedOffert = this.holdingOfferts.splice(offertIndex, 1);
      this.acceptedOfferts.push(aprovedOffert[0]);
    }
  }

  onOffertCanceled(offert: OffertHoldingModel) {
    let offertIndex = this.holdingOfferts.indexOf(offert);
    if (offertIndex > -1) {
      this.holdingOfferts.splice(offertIndex, 1);
    }
  }

  onSubmitReview() {
    this.reviewModel.title = this.reviewForm.value.reviewTitle;
    this.reviewModel.description = this.reviewForm.value.reviewDescription;
    this.reviewModel.qualityRate = this.reviewForm.value.qualityRate;
    this.reviewModel.professionalismRate = this.reviewForm.value.professionalismRate;
    this.reviewModel.punctualityRate = this.reviewForm.value.punctualityRate;
    this.reviewModel.rating = this.rate;

    this.reviewService
      .addReview(this.reviewModel, this.reviewImages)
      .subscribe(data => console.log(data));
  }

  onReviewClicked(offert: OffertAcceptedModel) {
    this.reviewModel = new ReviewModel(
      offert.adId,
      offert.categoryName,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  uploadImg(inputEvent) {
    var fileReader = new FileReader();

    fileReader.onload = (event: any) => {
      this.reviewImages.push({
        url: event.target.result,
        file: inputEvent.target.files[0]
      });
    };
    fileReader.readAsDataURL(inputEvent.target.files[0]);
  }
}
