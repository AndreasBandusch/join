import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../models/task.model';
import { ControlService } from './control.service';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  currentTask: any = {};
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
  dueDateOutput: string = '';
  showCategorys: boolean = false;
  showSubtask: boolean = false;
  catText: string = '';
  catStartText: string = 'Select task category';
  catColor: any = '';
  allSubtasks: any[] = [];
  showAssignedTo: boolean = false;
  selectedSubtasks: any[] = [];
  showSubtasksNotice: boolean = false;
  minDate: string = '';

  constructor(
    private db: AngularFirestore,
    public control: ControlService,
    private fControl: CustomformcontrolModule) { 
      this.getMinDate();
    }


  getMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }


  loadAssignedContactsInSelectedContacts(): void {
    for (let i = 0; i < this.currentTask.assignedTo.length; i++) {
      let contact = this.currentTask.assignedTo[i];
      this.selectedContacts[contact.id] = true;
    }
  }


  checkForm(): void {
    this.checkIfNoSubtasksArePresent();
    this.checkIfaContactIsAssigned();
    this.checkSelectedPrio();
    this.checkSelectedCategory();
    this.checkSubtasks();
    if (this.fControl.assignedToReady) {
      this.showAssignedTo = false;
    }
    if (this.allFormElementsAreCorrect()) {
      this.createTask();
    } else {
      this.fControl.hasSend = true;
    }
  }


  checkIfNoSubtasksArePresent(): void {
    if (!this.allSubtasks.length) {
      this.fControl.subtasksReady = true;
    }
  }


  // Check if a contact has been selected
  checkIfaContactIsAssigned(): void {
    let amount = this.numberOfSelectedContacts();
    if (amount < 1) {
      this.noContactsAssigned();
    } else {
      this.contactsAssigned();
    }
  }

  
  numberOfSelectedContacts(): number {
    let amount = 0;
    for (let item in this.selectedContacts) {
      if (this.selectedContacts[item]) {
        amount++;
      }
    }
    return amount;
  }


  noContactsAssigned() {
    this.fControl.noAssignedContactsErrorMsg = this.fControl.noAssignedContactsErrorStartMsg;
    this.fControl.assignedToReady = false;
    this.showAssignedTo = true;
  }


  contactsAssigned() {
    this.fControl.noAssignedContactsErrorMsg = '';
    this.fControl.assignedToReady = true;
  }


  // Check if a priority has been selected
  checkSelectedPrio(): void {
    if (this.activePrio === '') {
      this.fControl.noPrioErrorMsg = this.fControl.noPrioErrorStartMsg;
      this.fControl.prioReady = false;
    }
  }


  checkSelectedCategory(): void {
    if (this.selectedCategory === '') {
      this.fControl.noCategoryErrorMsg = this.fControl.noCategoryErrorStartMsg;
      this.fControl.categoryReady = false;
    } else {
      this.fControl.noCategoryErrorMsg = '';
      this.fControl.categoryReady = true;
    }
    this.showCategorys = false;
  }


  checkSubtasks(): void {
    if (this.allSubtasks.length) {
      this.showSubtasksNotice = false;
      if (this.assignedSubtasks.length) {
        this.fControl.noSubtaskErrorMsg = '';
        this.fControl.subtasksReady = true
      } else {
        this.fControl.noSubtaskErrorMsg = this.fControl.noSubtaskErrorStartMsg;
        this.fControl.subtasksReady = false;
      }
    } else {
      this.showSubtasksNotice = true;
    }
  }


  allFormElementsAreCorrect(): boolean {
    return (this.fControl.assignedToReady &&
      this.fControl.categoryReady &&
      this.fControl.prioReady &&
      this.fControl.subtasksReady &&
      this.fControl.taskForm.valid);
  }


  createTask(): void {
    let newTask = new Task(this.title,
      this.description,
      this.categoryId,
      this.assignedContactIdsForTask,
      this.dueDateTimestamp,
      this.activePrio,
      this.assignedSubtasks);
    this.saveTask(newTask);
  }


  saveTask(newTask: any): void {
    this.db
      .collection('tasks')
      .add(newTask.toJSON()).then(() => {
        if (!this.control.isOpenedInOverlay) {
          this.control.getMessage('Task added to board', 'assets/img/icons/add-task-board-icon.png');
        }
        this.control.isOpenedInOverlay = false;
        this.resetForm();
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
  }


  getPrioImage(prio: string): string {
    switch (prio) {
      case 'low':
        return 'add-task-low';

      case 'medium':
        return 'add-task-medium';

      case 'urgent':
        return 'add-task-urgent';

      default:
        return '';
    }
  }


  getContactIntialsStyles(color: string, index: number): object {
    let styles = {
      'background-color': color,
      'transform': `translateX(${index * 75}%)`
    }
    return styles;
  }


  resetForm() {
    this.unsetFormControlErrorMsgs();
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
    this.fControl.taskForm.reset();
    this.fControl.hasSend = false;
  }


  unsetFormControlErrorMsgs() {
    this.fControl.noPrioErrorMsg = '';
    this.fControl.noAssignedContactsErrorMsg = '';
    this.fControl.noCategoryErrorMsg = '';
    this.fControl.noSubtaskErrorMsg = '';
    this.fControl.noPrioErrorMsg = '';
    this.showSubtasksNotice = false
  }


  setDueDateOutput() {
    let date = new Date(this.dueDate);
    this.dueDateOutput = date.toLocaleString('en-US', { day: '2-digit' })
      + '-' + date.toLocaleString('en-EN', { month: '2-digit' })
      + '-' + date.getFullYear();
  }


  deleteTask() {
    const docId = this.currentTask.docId
    this.control.taskDetailsDialogOpen = false;
    this.db.collection('tasks').doc(docId).delete().then(() => {
      this.control.showDeleteTaskDialog = false;
      this.control.getMessage('Task deleted !');
    });

  }


  setPrio(prio: string) {
    this.activePrio = prio;
    this.fControl.noPrioErrorMsg = '';
    this.fControl.prioReady = true;
  }
}
