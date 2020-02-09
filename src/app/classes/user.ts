export class User {
    firstName: String;
    lastName: String;
    photoUrl: String;

    constructor({firstName,lastName,photoUrl}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoUrl = photoUrl;
    }
}
