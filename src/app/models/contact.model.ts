export class Contact {

    public firstName: string = '';
    public lastName: string = '';
    public email: string = '';
    public phone?: string = '';
    public initials: string = '';

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone?: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.getInitials();
    }

    getInitials() {
        this.initials = this.firstName.charAt(0) + this.lastName.charAt(0);
    }
}