import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  allContacts: any[] = [];
  assignedTotext = 'Select Contacts to assign';
  title: string;
  description: string;
  

  constructor(private afs: AngularFirestore, public control: ControlService, public task: TaskService) { 
    this.title = task.currentTask.title;
    this.description = task.currentTask.description; 
    this.task.dueDate = task.currentTask.dueDate;
    this.task.getTimestamp();
  }

  ngOnInit(): void {
    this.loadContacts();
    console.log(this.task.currentTask);
    this.task.dueDate = new Date(this.task.currentTask.dueDate).toISOString().slice(0,10);
    this.setPrio();
  }

 

  setPrio() {
    this.task.activePrio = this.task.currentTask.prio;
  }


  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe((changes) => {
      this.allContacts = changes;
    });
  }

 
  addContact() {
    this.control.notRouteToContactList = true;
    this.control.addContactDialogOpen = true
  }


  createUpdateTask() {
    const docId = this.task.currentTask.docId;
    this.task.currentTask.title = this.title;
    this.task.currentTask.description = this.description;
    this.task.currentTask.prio = this.task.activePrio;
    this.task.currentTask.dueDate = this.task.dueDate;
  
    this.task.updateSelectedContacts();
   
    const task = this.toJson();
    this.saveTask(docId, task);
    
    console.log('ASSIGNED: ',this.task.currentTask.assignedTo);
  }  


  toJson(): object {
    return {
      'title': this.task.currentTask.title,
      'description':  this.task.currentTask.description,
      'dueDate': this.task.dueDateTimestamp,
      'prio': this.task.activePrio,
      'assignedTo': this.task.assignedContactIdsForTask
    }  
  }


  saveTask(id: string, task: object): void {
    this.afs.collection('tasks').doc(id)
    .update(task).then(() => {
     this.control.editTasksDialogOpen = false;
     this.control.taskDetailsDialogOpen = true;
    });
  } 


  

}
