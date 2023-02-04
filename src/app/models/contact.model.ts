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

        this.checkPhoneExist(phone)
        this.getInitials();
        
    }
    private checkPhoneExist(phone?: string) {
        if (!phone) this.phone = 'No phone number exists';  
    }

    private getInitials() {
        this.initials = this.firstName.charAt(0) + this.lastName.charAt(0);
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            initials: this.initials,
        };
    }
}