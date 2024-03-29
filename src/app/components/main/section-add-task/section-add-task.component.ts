import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { TaskService } from 'src/app/services/task.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/app/models/category.model';
import { CustomformcontrolModule } from 'src/app/modules/customformcontrol/customformcontrol.module';

@Component({
  selector: 'app-section-add-task',
  templateUrl: './section-add-task.component.html',
  styleUrls: ['./section-add-task.component.scss']
})

export class SectionAddTaskComponent implements OnInit, OnDestroy {
  @ViewChild('addSubtask') inputField: ElementRef = new ElementRef(null);
  id: number = 0;
  assignedTo: number[] = [];
  showNewCategory: boolean = false;
  allCategorys: any[] = [];
  allContacts: any[] = [];
  assignedTotext = 'Select Contacts to assign'
  currentSubtask: string = '';
  categoryName: string = '';
  catColors: string[] = ['#8fa6fc', '#e83400', '#6bce33', '#ee8f11', '#cd37b9', '#0e45fa'];
  newCategory: Category = new Category(this.categoryName);
  minDate: string = '';

  @HostListener('window:resize')
  onResize() {
    this.checkMaxWidth(1100);
  }

  constructor(
    public control: ControlService,
    public task: TaskService,
    private afs: AngularFirestore,
    public fControl: CustomformcontrolModule
  ) { }


  ngOnInit(): void {
    this.task.resetForm();
    this.checkMaxWidth(1100);
    this.loadCategorys();
    this.loadContacts();
  }


  ngOnDestroy(): void {
    this.control.showAddTaskBotton = false;
    this.fControl.noPrioErrorMsg = '';
    this.fControl.noAssignedContactsErrorMsg = '';
    this.fControl.noCategoryErrorMsg = '';
  }


  loadCategorys(): void {
    this.afs.collection('categorys').valueChanges().subscribe((changes) => {
      this.allCategorys = changes;
    });
  }


  loadContacts(): void {
    this.afs.collection('contacts').valueChanges().subscribe((changes) => {
      this.allContacts = changes;
    });
  }


  checkMaxWidth(maxWidth: number): void {
    if (window.innerWidth <= maxWidth) {
      this.control.showAddTaskBotton = true;
    } else {
      this.control.showAddTaskBotton = false;
    }
  }


  selectCategory(category: string, color: string, id: number): void {
    this.task.selectedCategory = category;
    this.task.catText = category;
    this.task.catColor = color;
    this.task.showCategorys = false;
    this.task.categoryId = id;
    this.fControl.noCategoryErrorMsg = '';
  }


  createCategory(): void {
    this.showNewCategory = true;
    this.categoryName = '';
    this.task.catColor = '';
  }


  saveCategory(): void {
    this.newCategory = new Category(this.categoryName, this.task.catColor);
    this.task.categoryId = this.newCategory.id;
    this.afs
      .collection('categorys')
      .add(
        this.newCategory.toJson()
      ).then(() => {
        this.setNewCategory();
      });
  }


  setNewCategory(): void {
    this.task.catColor = this.newCategory.color;
    this.task.catText = this.categoryName;
    this.task.showCategorys = !this.task.showCategorys;
    this.showNewCategory = false;
    this.task.selectedCategory = this.categoryName;
    this.fControl.noCategoryErrorMsg = '';
  }


  cancel(): void {
    this.task.showCategorys = !this.task.showCategorys;
    this.showNewCategory = false;
    this.task.catColor = '';
    this.task.catText = this.task.catStartText;
    this.task.catColor = '';
    this.categoryName = '';
  }


  updateSelectedContacts(): void {
    this.task.assignedContactIdsForTask = [];
    for (let key in this.task.selectedContacts) {
      if (this.task.selectedContacts[key]) {
        this.task.assignedContactIdsForTask.push(key);
      }
    }
  }


  updateAssignedSubtasks(): void {
    this.task.assignedSubtasks = [];
    for (let key in this.task.selectedSubtasks) {
      if (this.task.selectedSubtasks[key] && !this.task.assignedContactIdsForTask.includes(key)) {
        this.task.assignedSubtasks.push({ name: key, done: false });
      }
    }
    this.task.checkSubtasks();
  }


  setFocus(): void {
    this.inputField.nativeElement.focus();
    this.task.showSubtask = true;
  }


  createSubtask(): void {
    this.task.allSubtasks.push({ name: this.currentSubtask });
    this.currentSubtask = '';
    this.task.showSubtask = false;
    this.task.showSubtasksNotice = false;
  }


  getTimestamp(): void {
    this.task.dueDateTimestamp = new Date(this.task.dueDate).getTime();
  }


  addContact(): void {
    this.control.notRouteToContactList = true;
    this.control.addContactDialogOpen = true
  }
}
