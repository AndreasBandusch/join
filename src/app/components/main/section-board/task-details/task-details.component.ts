import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  tester: string = '';

  constructor(public control: ControlService, private afs: AngularFirestore) {
    this.dueDate = control.currentTask.dueDate;
  }



  ngOnInit(): void {
    // console.log(this.control.currentTask);
    this.setDueDateOutput();


    for (let i = 0; i < this.control.currentTask.subTasks.length; i++) {
      this.subTasks.push(this.control.currentTask.subTasks[i]);
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
    let docId = this.control.currentTask.docId;
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
