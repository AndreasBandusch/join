import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../models/task.model';
import { ControlService } from './control.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  title: string = '';
  description: string = '';
  categoryId: number = 0;
  assignedContactIdsForTask: any[] = [];
  dueDateTimestamp: number = 0;
  activePrio: string = '';
  assignedSubtasks: any[] = [];
  selectedCategory: string = '';
  selectedContacts: { [key: number]: boolean } = {};


  dueDate: string = '';
  showCategorys: boolean = false;
  showSubtask: boolean = false;
  catText: string = '';
  catStartText: string = 'Select task catagory';
  catColor: any = '';
  allSubtasks: any[] = [];
  showAssignedTo: boolean = false;
  selectedSubtasks: any[] = [];

  constructor(
    private db: AngularFirestore,
    public control: ControlService) {}

    loadAssignedContactsInSelectedContacts() {
      for (let i = 0; i < this.control.currentTask.assignedTo.length; i++) {
        let contact = this.control.currentTask.assignedTo[i];
        this.selectedContacts[contact.id] = true;
      }
    }


  createTask() {
    let newTask = new Task(this.title,
    this.description,
    this.categoryId,
    this.assignedContactIdsForTask,
    this.dueDateTimestamp,
    this.activePrio,
    this.assignedSubtasks);
    this.saveTask(newTask);
    this.resetForm();
  }


  saveTask(newTask: any) {
    this.db
      .collection('tasks')
      .add(newTask.toJSON()).then(() => {
        this.control.getMessage('Task added to board', 'assets/img/icons/add-task-board-icon.png');
      });
  }

  getTimestamp() {
    this.dueDateTimestamp = new Date(this.dueDate).getTime();
  }

  updateSelectedContacts() {
    this.assignedContactIdsForTask = [];
    for (let key in this.selectedContacts) {
      if (this.selectedContacts[key] && !this.assignedContactIdsForTask.includes(key)) {
        this.assignedContactIdsForTask.push(key);
      }
    }

    console.log(this.assignedContactIdsForTask);
    console.log('Selected: ', this.selectedContacts);
  }



  resetForm() {
    this.description = '';
    this.selectedCategory = '';
    this.selectedContacts = [];
    this.dueDate = '';
    this.activePrio = '';
    this.showCategorys = false;
    this.showSubtask = false;
    this.title = '';
    this.catText = this.catStartText;
    this.catColor = '';
    this.allSubtasks = [];
    this.showAssignedTo = false;
    this.selectedSubtasks = [];
    this.assignedSubtasks = [];
    this.assignedContactIdsForTask = [];
    this.categoryId = 0;
  }

//   test() {
//     for (let key in this.selectedContacts) {
    
//       if (this.selectedContacts[key] && !this.assignedContactIdsForTask.includes(key)) {
//         this.assignedContactIdsForTask.push(key);
//       }
//   }
//   console.log(this.selectedContacts);
// }
}
