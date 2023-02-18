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
    this.checkMaxWidth(1100);
  }

  constructor(public control: ControlService) {}


  ngOnInit(): void {
    this.checkMaxWidth(1100);
  }


  ngOnDestroy(): void {
    this.control.showAddTaskBotton = false;
  }


  checkMaxWidth(maxWidth: number) {
    if (window.innerWidth <= maxWidth) {
      this.control.showAddTaskBotton = true;
    } else {
      this.control.showAddTaskBotton = false;
    }
  }
}
