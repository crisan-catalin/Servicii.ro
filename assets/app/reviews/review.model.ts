export class ReviewModel {
    constructor(
        public adId?: String,
        public adCateogoryName?: String,
        public reviewerName?: String,
        public title?: String,
        public description?: String,
        public qualityRate?: String,
        public professionalismRate?: String,
        public punctualityRate?: String,
        public rating?: Number,
        public reviserUserId?: String,
        public id?: String
    ) { }
}