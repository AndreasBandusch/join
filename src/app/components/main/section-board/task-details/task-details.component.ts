import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  subTasks: any[] = [];
  currentSubtask: any = {};
  docId: string;

  constructor(public control: ControlService, private afs: AngularFirestore, public task: TaskService) {
    this.task.dueDate = task.currentTask.dueDate;
    this.docId = task.currentTask.docId;
    
  }



  ngOnInit(): void {
    this.task.setDueDateOutput();
    this.task.updateSelectedContacts();

    for (let i = 0; i < this.task.currentTask.subTasks.length; i++) {
      this.subTasks.push(this.task.currentTask.subTasks[i]);
    }

    
   
  }


  

  // updateSubTaskDoneStatus(status: boolean, index: number) {
  //   console.log(status);
  //   status = !status;
  //   this.subTasks[index].done = status;
  // }

  updateSubTaskStatus(index: number) {
    let status = this.subTasks[index].done;
    if (status === false) {
      this.subTasks[index].done = true;
    } else {
      this.subTasks[index].done = false;
    }
    this.saveStatus();
  }


  saveStatus(): void {
    let changes = { 'subTasks': this.subTasks }
    this.afs.collection('tasks')
      .doc(this.docId)
      .update(changes);
  }

  
  openEditDialog() {
    this.control.taskDetailsDialogOpen = false;
    this.control.editTasksDialogOpen = true;
  }

}
