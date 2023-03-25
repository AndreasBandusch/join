export class Task {
    public id: number = 0;
    public title: string = '';
    public description: string = '';
    public category: number = 0;
    public assignedTo: number[] = [];
    public dueDate: number = 0;
    public prio: string = '';
    public subTasks?: string[] = [];
    public status: string = 'todo';

    constructor(
        title: string,
        description: string,
        categoryId: number,
        assignedTo: number[],
        dueDate: number,
        prio: string,
        subTasks?: string[]
    ) {
        this.createId();
        this.title = title;
        this.description = description;
        this.category = categoryId;
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

    public toJSON(): object {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            assignedTo: this.assignedTo,
            dueDate: this.dueDate,
            prio: this.prio,
            subTasks: this.subTasks,
            status: this.status
        }
    }
}