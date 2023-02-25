import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/app/models/category.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-section-add-task',
  templateUrl: './section-add-task.component.html',
  styleUrls: ['./section-add-task.component.scss']
})
export class SectionAddTaskComponent implements OnInit, OnDestroy {

  @ViewChild('addSubtask') inputField: ElementRef = new ElementRef(null);
  id: number = 0;
  title: string = '';
  description: string = '';
  // category: string = '';
  assignedTo: number[] = [];
  dueDate: number = 0;
  // prio: string = '';
  subTasks: string[] = [];
  showCategorys: boolean = false;
  showNewCategory: boolean = false;
  showAssignedTo: boolean = false;
  showSubtask: boolean = false;
  allCategorys: any[] = [];
  allContacts: any[] = [];
  allSubtasks: any[] = [];
  selectedContacts: any[] = [];
  assignedContactIdsForTask: any[] = [];
  assignedSubtasks: any[] = [];
  assignedTotext = 'Select Contacts to assign'
  catStartText: string = 'Select task catagory';
  activePrio: string = '';
  selectedCategory: string = '';
  catText: string = '';
  catColor: any = '';
  currentSubtask: string = '';
  categoryName: string = '';
  catColors: string[] = ['#8fa6fc', '#e83400', '#6bce33', '#ee8f11', '#cd37b9', '#0e45fa'];
  newCategory: Category = new Category(this.categoryName);
  selectedSubtasks: any[] = [];


  @HostListener('window:resize')
  onResize() {
    this.checkMaxWidth(1100);
  }

  constructor(
    public control: ControlService,
    private afs: AngularFirestore
  ) { }


  ngOnInit(): void {
    this.catText = this.catStartText;
    this.checkMaxWidth(1100);

    this.loadCategorys();
    this.loadContacts();
  }


  ngOnDestroy(): void {
    this.control.showAddTaskBotton = false;
  }

  loadCategorys() {
    this.afs.collection('categorys').valueChanges().subscribe((changes) => {
      this.allCategorys = changes;
    });
  }

  loadContacts() {
    this.afs.collection('contacts').valueChanges().subscribe((changes) => {
      this.allContacts = changes;

    });


  }

  checkMaxWidth(maxWidth: number) {
    if (window.innerWidth <= maxWidth) {
      this.control.showAddTaskBotton = true;
    } else {
      this.control.showAddTaskBotton = false;
    }
  }

  inputView() {
    console.log(this.categoryName);
  }

  selectCategory(category: string, color: string) {
    this.selectedCategory = category;
    this.catText = category;
    this.catColor = color;
    this.showCategorys = false;

  }

  createCategory() {

    this.showNewCategory = true;
    this.categoryName = '';
    this.catColor = '';
  }

  saveCategory() {
    this.newCategory = new Category(this.categoryName, this.catColor);
    this.afs
      .collection('categorys')
      .add(
        this.newCategory.toJson()
      ).then(() => {
        this.catColor = this.newCategory.color;
        this.catText = this.categoryName;
        this.showCategorys = !this.showCategorys;
        this.showNewCategory = false;
        this.selectedCategory = this.categoryName;
      });

  }

  cancel() {
    this.showCategorys = !this.showCategorys;
    this.showNewCategory = false;
    this.catColor = '';
    this.catText = this.catStartText;
    this.catColor = '';
    this.categoryName = '';
  }

  updateSelectedContacts() {
    this.assignedContactIdsForTask = [];
    for (let key in this.selectedContacts) {
      if (this.selectedContacts[key]) {
        this.assignedContactIdsForTask.push(key);
      }
    }
  }

  updateAssignedSubtasks() {
    this.assignedSubtasks = [];
    for (let key in this.selectedSubtasks) {
      if (this.selectedSubtasks[key]) {
        this.assignedSubtasks.push({ name: key, done: false });
      }
    }
    console.log('Assigned subtasks: ', this.assignedSubtasks);
  }



  setFocus() {
    this.inputField.nativeElement.focus();
    this.showSubtask = true;
  }

  createSubtask() {
    this.selectedSubtasks = [];
    this.allSubtasks.push({ name: this.currentSubtask });
    console.log('All subtasks: ', this.allSubtasks);
    this.currentSubtask = '';
    this.showSubtask = false;
  }

  createTask() {

    console.log('Assigned subtasks: ', this.assignedSubtasks);
    let newTask = new Task(this.title,
      this.description,
      this.selectedCategory,
      this.assignedContactIdsForTask,
      this.dueDate,
      this.activePrio,
      this.assignedSubtasks);

    console.log('New Task:', newTask);
    this.saveTask();
    this.resetForm();

    this.control.getMessage('Test');
  }


  saveTask() {
    console.log('Task saved!');
  }

  resetForm() {
    this.description = '';
    this.selectedCategory = '';
    this.selectedContacts = [];
    this.dueDate = 0;
    this.activePrio = '';
    this.showCategorys = false;
    this.showSubtask = false;
    this.title = '';
    this.catText = this.catStartText;
    this.catColor = '';
    this.allSubtasks = [];
    this.showAssignedTo = false;
    this.selectedSubtasks = [];
  }
}
