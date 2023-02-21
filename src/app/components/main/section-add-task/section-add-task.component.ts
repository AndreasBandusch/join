import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-section-add-task',
  templateUrl: './section-add-task.component.html',
  styleUrls: ['./section-add-task.component.scss']
})
export class SectionAddTaskComponent implements OnInit, OnDestroy {
  id: number = 0;
  title: string = '';
  description: string = '';
  category: string = '';
  assignedTo: number[] = [];
  dueDate: number = 0;
  prio: string = '';
  subTasks: string[] = [];
  showCategorys: boolean = false;
  allCategorys: any[] = [];
  selectedCategory: string = '';
  catText: string = 'Select task catagory';
  catColor: string = '';
  newCategory: boolean = false;
  placeholder: string = 'New category name';
  categoryName: string = '';

  @HostListener('window:resize')
  onResize() {
    this.checkMaxWidth(1100);
  }

  constructor(
    public control: ControlService,
    private afs: AngularFirestore
    ) { }


  ngOnInit(): void {
    this.checkMaxWidth(1100);

    this.loadCategorys();
  }


  ngOnDestroy(): void {
    this.control.showAddTaskBotton = false;
  }

  loadCategorys() {
    this.afs.collection('categorys').valueChanges().subscribe((changes) => {
       this.allCategorys = changes;
       console.log(this.allCategorys);
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
    console.log('Neue Kategorie');
    this.newCategory = true;
   
  }


  toggleCategorys() {
    this.showCategorys = !this.showCategorys;
  }

  
}
