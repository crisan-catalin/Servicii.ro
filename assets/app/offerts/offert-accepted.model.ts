export class OffertAcceptedModel {
    constructor(
        public _id?: String,
        public adId?: String,
        public adTitle?: String,
        public categoryName?: String,
        public offererId?: String,
        public offererName?: String,
        public description?: String,
        public price?: String,
        public currency?: String,
        public reviewId?: String
    ) { }
}