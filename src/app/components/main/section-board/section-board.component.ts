import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-section-board',
  templateUrl: './section-board.component.html',
  styleUrls: ['./section-board.component.scss']
})
export class SectionBoardComponent implements OnInit {
  allContacts: any[] = [];
  allTasks: any[] = [];
  allCategorys: any[] = [];
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  awaitingFeedbackTasks: any[] = [];
  doneTasks: any[] = [];
  isDragging: boolean = false;
  currentSearch: string = '';
  maxDescriptionLength = 50;

  constructor(
    private afs: AngularFirestore,
    public control: ControlService,
    public task: TaskService) { }


  ngOnInit() {
    this.loadContacts();
    this.loadCategorys();
    this.loadTasks();
  }


  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe(changes => {
      this.allContacts = changes;
      this.loadAssignedContactsInAllTasks();
      this.loadCategorys();
    })
  }


  loadTasks() {
    this.afs.collection('tasks').valueChanges({ idField: 'docId' }).subscribe(changes => {
      this.allTasks = changes;
      this.loadContacts();
      this.loadCategorys();
      this.seperateTasksByStatus();
    })
  }


  loadCategorys() {
    this.afs.collection('categorys').valueChanges().subscribe(changes => {
      this.allCategorys = changes;
      this.loadAssignedCategoryInAllTasks();
    })
  }


  loadAssignedContactsInAllTasks() {
    for (let task of this.allTasks) {
      let contacts = [];
      for (let assignedToId of task.assignedTo) {
        let contact = this.allContacts.find(contact => contact.id == assignedToId);
        if (contact) {
          contacts.push(contact);
        }
      }
      task.assignedTo = contacts;
    }
  }


  loadAssignedCategoryInAllTasks(): void {
    for (let task of this.allTasks) {
      let category = this.allCategorys.find(cat => cat.id === task.category);
      if (category) {
        task.category = category;
      }
    }
  }


  seperateTasksByStatus(): void {
   this.resetTasksArrays()
   this.sortAndFillTasksArrays();
  }


  resetTasksArrays() {
    this.todoTasks = [];
    this.inProgressTasks = [];
    this.awaitingFeedbackTasks = [];
    this.doneTasks = [];
  }


  sortAndFillTasksArrays() {
    this.allTasks.forEach(task => {
      switch (task.status) {
        case 'todo':
          this.todoTasks.push(task);
          break;
        case 'inProgress':
          this.inProgressTasks.push(task);
          break;
        case 'awaitingFeedback':
          this.awaitingFeedbackTasks.push(task);
          break;
        case 'done':
          this.doneTasks.push(task);
          break;
      }
    })
  }


  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.setTaskStatus(event.item.data, event.container.id);
  }

  
  setTaskStatus(currentTask: any, dropListId: string): void {
    switch (dropListId) {
      case 'todo':
        currentTask.status = 'todo';
        break;
      case 'in-progress':
        currentTask.status = 'inProgress';
        break;
      case 'awaiting-feedback':
        currentTask.status = 'awaitingFeedback';
        break;
      case 'done':
        currentTask.status = 'done';
        break;
    }
    this.updateTaskStatus(currentTask);
  }


  updateTaskStatus(task: any): void {
    let docId = task.docId;
    this.afs
      .collection("tasks")
      .doc(docId)
      .update({ status: task.status });
  }


  getContactIntialsStyles(color: string, index: number): object {
    let styles = {
      'background-color': color,
      'transform': `translateX(${index * 75}%)`
    }
    return styles;
  }


  getDoneSubtasksNumber(subTasks: any[]): number {
    let number = 0;
    subTasks.forEach(task => {
      if (task.done === true) {
        number++;
      }
    })
    return number;
  }


  openTaskDetails(currentTask: any): void {
    this.task.currentTask = currentTask;
    this.control.taskDetailsDialogOpen = true;
  }


  getWidthForStatusBar(doneSubTasks: number, subTaskslength: number): string {
    let percent = (doneSubTasks / subTaskslength) * 100;
    return `${percent}%`;
  }
  

  searchResult(currentTask: any): boolean {
    if (this.currentSearch) {
      let search = this.currentSearch.toLowerCase();
      let title = currentTask.title.toLowerCase();
      let description = currentTask.description.toLowerCase();
      let category = currentTask.category.name.toLowerCase();

      if (title.includes(search) || description.includes(search) || category.includes(search)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
