import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-section-add-task',
  templateUrl: './section-add-task.component.html',
  styleUrls: ['./section-add-task.component.scss']
})
export class SectionAddTaskComponent {
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth <= 1100) {
      console.log('Bildschirmbreite ist kleiner oder gleich 1100px');
    }
  }
}
