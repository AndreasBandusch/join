import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';



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
  test: number = 0;
  isMovend: boolean = false;

  constructor(private afs: AngularFirestore) { }


  ngOnInit() {
    console.log('Loaded');
   
    this.loadContacts();
    this.loadCategorys();
    this.loadTasks();
  }

  


  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe(changes => {
      this.allContacts = changes;
      this.loadAssignedContactsInAllTasks();
    })
  }


  loadTasks() {
    this.afs.collection('tasks').valueChanges({ idField: 'docId' }).subscribe(changes => {
      this.allTasks = changes;
      this.loadContacts();
      this.loadCategorys();
      this.seperateStatus();
      console.log('Tasks:', 
      this.allTasks);
      
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


  loadAssignedCategoryInAllTasks() {
    for (let task of this.allTasks) {
      let category = this.allCategorys.find(cat => cat.id === task.category);
      if (category) {
        task.category = category;
      }
    }
  }


  seperateStatus() {
    this.todoTasks = [];
    this.inProgressTasks = [];
    this.awaitingFeedbackTasks = [];
    this.doneTasks = [];
    
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


  drop(event: CdkDragDrop<any[]>) {
  
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
    console.log('Drop', this.allTasks);
    this.setTaskStatus(event.container.data, event.container.id);
  }



  setTaskStatus(droppedData: any[], dropListId: string): void {
    let currentTask = droppedData;
    console.log('Currrent Task', currentTask);
    for (let i = 0; i < droppedData.length; i++) {
      let status;
      switch (dropListId) {
        case 'todo':
          status = 'todo';
          currentTask[i].status = status;
          break;
        case 'in-progress':
          status = 'inProgress';
          currentTask[i].status = status;
          break;
        case 'awaiting-feedback':
          status = 'awaitingFeedback';
          currentTask[i].status = status;
          break;
        case 'done':
          status = 'done';
          currentTask[i].status = status;
          break;
      }
      currentTask[i].status = status;
      this.updateTaskStatus(currentTask[i]);
    }
  }


  updateTaskStatus(task: any): void {

    let docId = task.docId;

    console.log(task.status);
    this.afs
      .collection("tasks")
      .doc(docId)
      .update({ status: task.status }).then(() => {

      })

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


  getPrioImage(prio: string): string {
    switch (prio) {
      case 'low':
        return 'add-task-low.png';

      case 'medium':
        return 'add-task-medium.png';

      case 'urgent':
        return 'add-task-urgent.png';

      default:
        return '';
    }
  }

  testMe(color: string) {
    console.log(color);
  }
}
