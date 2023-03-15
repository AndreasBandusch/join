import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../models/task.model';
import { ControlService } from './control.service';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
  hasSend: boolean = false;
  showSubtasksNotice: boolean = false;
 

  constructor(
    private db: AngularFirestore,
    public control: ControlService,
    private fControl: CustomformcontrolModule) { }

  loadAssignedContactsInSelectedContacts() {
    for (let i = 0; i < this.currentTask.assignedTo.length; i++) {
      let contact = this.currentTask.assignedTo[i];
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
        if (!this.control.isOpenedInOverlay) {
          this.control.getMessage('Task added to board', 'assets/img/icons/add-task-board-icon.png');
        }
        this.control.isOpenedInOverlay = false;
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
    console.log(this.currentTask.assignedTo);
    console.log('Selected: ', this.selectedContacts);
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
    this.unsetFormControlErrorMsgs();
  }

  unsetFormControlErrorMsgs() {
    this.fControl.noPrioErrorMsg = '';
    this.fControl.noAssignedContactsErrorMsg = '';
    this.fControl.noCategoryErrorMsg ='';
    this.fControl.noSubtaskErrorMsg = '';
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


  checkForm() {
    this.hasSend = true;
    if (!this.allSubtasks.length) {
      this.fControl.subtasksReady = true;
    }
    this.checkIfaContactIsAssigned();
    this.checkSelectedPrio();
    this.checkSelectedCategory();
    this.checkSubtasks();
    if (this.fControl.assignedToReady &&
      this.fControl.categoryReady &&
      this.fControl.prioReady &&
      this.fControl.subtasksReady &&
      this.taskForm.valid) {
      this.createTask();
      this.hasSend = false;
  
    }
  }


   // Check if a priority has been selected
   checkSelectedPrio() {
    if (this.activePrio === '') {
      this.fControl.noPrioErrorMsg = this.fControl.noPrioErrorStartMsg;
      this.fControl.prioReady = false;
    }
  }

  // Check if a contact has been selected
  checkIfaContactIsAssigned() {
    let amount = 0;
    for (let item in this.selectedContacts) {
      if (this.selectedContacts[item]) {
        amount++;
      }
    }
    if (amount < 1) {
      this.fControl.noAssignedContactsErrorMsg = this.fControl.noAssignedContactsErrorStartMsg;
      this.fControl.assignedToReady = false;
    } else {
      this.fControl.noAssignedContactsErrorMsg = '';
      this.fControl.assignedToReady = true;
    }
    this.showAssignedTo = false;
  }


  checkSelectedCategory() {
    if (this.selectedCategory === '') {
      this.fControl.noCategoryErrorMsg = this.fControl.noCategoryErrorStartMsg;
      this.fControl.categoryReady = false;
    } else {
      this.fControl.noCategoryErrorMsg = '';
      this.fControl.categoryReady = true;
    }
    this.showCategorys = false;

  }


  checkSubtasks() {
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



  public taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ], []),
    description: new FormControl('', [
      Validators.required
    ], []),
    dueDate: new FormControl('', [
      Validators.required
    ], [])
  });

}
