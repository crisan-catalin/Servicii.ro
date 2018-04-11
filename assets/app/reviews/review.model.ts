export class ReviewModel {
    constructor(
        public adId?: String,
        public adCateogoryName?: String,
        public reviewerName?: String,
        public title?: String,
        public description?: String,
        public rating?: Number
    ) { }
}