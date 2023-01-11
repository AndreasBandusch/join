import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionSummaryComponent } from './components/main/section-summary/section-summary.component';
import { SectionAddTaskComponent } from './components/main/section-add-task/section-add-task.component';
import { SectionBoardComponent } from './components/main/section-board/section-board.component';
import { SectionContactsComponent } from './components/main/section-contacts/section-contacts.component';
import { ImpressumComponent } from './components/main/impressum/impressum.component';
import { DatenschutzComponent } from './components/main/datenschutz/datenschutz.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  { path: 'summary', component: SectionSummaryComponent },
  { path: 'add-task', component: SectionAddTaskComponent },
  { path: 'board', component: SectionBoardComponent },
  { path: 'contacts', component: SectionContactsComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
