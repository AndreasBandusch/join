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
  dueDate: number;
  dueDateOutput: string = '';
  subTasks: any[] = [];
  currentSubtask: any = {};
 

  constructor(public control: ControlService, private afs: AngularFirestore, public task: TaskService) {
    this.dueDate = task.currentTask.dueDate;
  }



  ngOnInit(): void {
    // console.log(this.control.currentTask);
    this.setDueDateOutput();


    for (let i = 0; i < this.task.currentTask.subTasks.length; i++) {
      this.subTasks.push(this.task.currentTask.subTasks[i]);
    }

    console.log(this.subTasks);

  }


  setDueDateOutput() {
    let date = new Date(this.dueDate);
    this.dueDateOutput = date.toLocaleString('en-US', { day: '2-digit' })
      + '-' + date.toLocaleString('en-EN', { month: '2-digit' })
      + '-' + date.getFullYear();
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
    let docId = this.task.currentTask.docId;
    console.log(this.currentSubtask.name);
    this.afs.collection('tasks')
      .doc(docId)
      .update(changes);
  }



  openEditDialog() {
    this.control.taskDetailsDialogOpen = false;
    this.control.editTasksDialogOpen = true;
  }

}
