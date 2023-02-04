export class Contact {
    public id: number = 0
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

        this.initContact(phone);
    }


    private initContact(phone?: string): void {
        this.createId();
        this.checkPhoneNumberExist(phone)
        this.getInitials();
    }

    private checkPhoneNumberExist(phone?: string) {
        if (!phone) this.phone = 'No phone number exists';
    }


    private createId(): void {
        this.id = Date.now();
    }


    private getInitials(): void {
        this.initials = this.firstName.charAt(0) + this.lastName.charAt(0);
    }

    public toJSON(): object {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            initials: this.initials,
        };
    }
}