export class OffertModel {
    constructor(
        public adId?: String,
        public offererId?: String,
        public reviewId?: String,
        public description?: String,
        public price?: String,
        public currency?: String,
        public status?: String
    ) { }
}