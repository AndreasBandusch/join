export class Task {
    public id: number = 0;
    public title: string = '';
    public description: string = '';
    public category: string = '';
    public assignedTo: number[] = [];
    public dueDate: number = 0;
    public prio: string = '';
    public subTasks?: string[] = [];
    public status: string = 'todo';

    constructor(
        title: string, 
        description: string,
        category: string,
        assignedTo: number[],
        dueDate: number,
        prio: string,
        subTasks?: string[]
    ){
        this.createId();
        this.title = title;
        this.description = description;
        this.category = category;
        this.assignedTo = assignedTo;
        this.dueDate = dueDate;
        this.prio = prio;
        this.subTasks = subTasks;
    }


    public setStatus(status: string): void {
        this.status = status;
    }


    private createId(): void {
        this.id = Date.now();
    }
}