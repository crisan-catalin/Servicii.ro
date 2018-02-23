export class User {
    constructor(public email: string,
                public password: string,
                public name?: string,
                public phone?: string,
                public location?: string,
                public regularUser?: boolean,
                public experienceYears?: number,
                public biography?: string) {
    }
}