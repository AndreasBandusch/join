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
  dueDate: number;
 
 

  constructor(private afs: AngularFirestore, public control: ControlService, public task: TaskService) { 
    this.title = control.currentTask.title;
    this.description = control.currentTask.description; 
    this.dueDate = control.currentTask.dueDate;
    // this.task.assignedContactIdsForTask = this.control.currentTask.showAssignedTo;
    
  }

  ngOnInit(): void {
    console.log('Current Task:', this.control.currentTask);
    console.log('Assigend to: ', this.control.currentTask.assignedTo);
    this.loadContacts();
    this.task.dueDate = new Date(this.control.currentTask.dueDate).toISOString().slice(0,10);
  
    this.setPrio();
    this.task.test();
    
    this.task.abc();
  }

  setPrio() {
    this.task.activePrio = this.control.currentTask.prio;
   
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

  saveTask() {
    const docId = this.control.currentTask.docId;

    this.control.currentTask.title = this.title;
    this.control.currentTask.description = this.description;
    this.control.currentTask.dueDate = this.dueDate;
    this.control.currentTask.prio = this.task.activePrio;
    

   
    
    const task = {
      'title': this.control.currentTask.title,
      'description':  this.control.currentTask.description,
      'dueDate': this.task.dueDateTimestamp,
      'prio': this.task.activePrio,
      'assignedTo': this.task.assignedContactIdsForTask
    }

    this.afs.collection('tasks').doc(docId)
    .update(task).then(() => {
     this.control.editTasksDialogOpen = false;
    });
    
  }  


  
}
