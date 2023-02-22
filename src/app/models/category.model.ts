export class Category {
    public id: number = 0;
    public name: string = '';
    public color?: string = '';
    

    constructor(
        name: string, 
        color?: string
    ){
        this.getRandomId();
        this.name = name;
        this.color = color;
        this.checkIfColorExist(color);
    }


    private checkIfColorExist(color?: string): void {
        if (color) {
            this.color = color;
        } else {
            this.getRandomColor();
        }
    }

    private getRandomColor(): void {
       let  colors: string[] = ['#8fa6fc', '#e83400', '#6bce33', '#ee8f11', '#cd37b9', '#0e45fa'];
       this.color = colors[Math.floor(Math.random() * colors.length)];
    }


    private getRandomId(): void {
        this.id = Date.now();
    }


    public toJson(): object {
        return {
            id: this.id,
            name: this.name,
            color: this.color
        }
    } 
}