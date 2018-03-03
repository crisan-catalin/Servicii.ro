export class OffertModel {
    constructor(
        public _id?: String,
        public adId?: any,
        public offererId?: String,
        public reviewId?: String,
        public description?: String,
        public price?: String,
        public currency?: String,
        public status?: String
    ) { }
}