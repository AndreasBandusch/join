import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-section-add-task',
  templateUrl: './section-add-task.component.html',
  styleUrls: ['./section-add-task.component.scss']
})
export class SectionAddTaskComponent implements OnInit, OnDestroy {

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth <= 1100) {
      this.control.showAddTaskBotton = true;
    } else {
      this.control.showAddTaskBotton = false;
    }
  }

  constructor(private control: ControlService) {}


  ngOnInit(): void {
    if (window.innerWidth <= 1100) {
      this.control.showAddTaskBotton = true;
    } else {
      this.control.showAddTaskBotton = false;
    }
  }


  ngOnDestroy(): void {
    this.control.showAddTaskBotton = false;
  }

}
