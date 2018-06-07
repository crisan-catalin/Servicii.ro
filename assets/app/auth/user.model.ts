export class User {
    constructor(public email: string,
        public password: string,
        public name?: string,
        public phone?: string,
        public location?: any,
        public experienceYears?: number,
        public biography?: string,
        public notificationRange?: number) {
    }
}