export class ReviewModel {
    constructor(
        public adId?: String,
        public adTitle?: String,
        public adCateogoryName?: String,
        public reviewerName?: String,
        public description?: String,
        public rating?: Number
    ) { }
}