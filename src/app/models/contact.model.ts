export class Contact {
    public id: number = 0
    public firstName: string = '';
    public lastName: string = '';
    public email: string = '';
    public phone?: string = '';
    public initials: string = '';

    constructor(
        fullName: string,
        email: string,
        phone?: string,
    ) {

        this.email = email;
        this.phone = phone;
        this.transformName(fullName);
        this.initContact(phone);

    }

    private transformName(fullName: string) {
        let splittedName = fullName.trim().replace(/\s+/g, ' ').split(" ");
        this.firstName = splittedName[0];
        this.lastName = splittedName[splittedName.length - 1];
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