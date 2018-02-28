export class AdModel {
    constructor(
        public id?: string,
        public userId?: string,
        public title?: string,
        public description?: string,
        public categoryName?: string,
        public location?: { lat: number, lng: number },
        public expirationDate?: Date,
        public locationName?: string
    ) { }
}