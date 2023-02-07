export class Contact {
    public id: number = 0
    public firstName: string = '';
    public lastName: string = '';
    public email: string = '';
    public phone?: string = '';
    public initials: string = '';
    public color: string = '';

    constructor(
        fullName: string,
        email: string,
        phone?: string,
    ) {

        this.email = email.trim().toLocaleLowerCase();
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
        this.getRandomColor()
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

    private getRandomColor() {
        let colors = 
            ['#FFB900', '#E60073', '#1D7AFF', '#FF55E6', '#00FF6E', '#FF0048', 
            '#7A00FF','#FFCF40', '#7A00E6', '#40FFCF', '#E67A00', '#00FFCF', 
            '#E60048', '#CF40FF','#FFA900', '#E6009C', '#00A9FF', '#9C00E6', 
            '#00FFA9', '#E6006D', '#9C7AFF', '#FF7A00', '#9327FF', '#29ABE2', 
            '#FC71FF', '#02CF2F', '#AF1616', '#462F8A'
        ];

        this.color = colors[Math.floor(Math.random() * colors.length)];
        
    }

    public toJSON(): object {
    return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        initials: this.initials,
        color: this.color,
    };
}
}