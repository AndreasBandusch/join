import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionSummaryComponent } from './components/main/section-summary/section-summary.component';
import { SectionAddTaskComponent } from './components/main/section-add-task/section-add-task.component';
import { SectionBoardComponent } from './components/main/section-board/section-board.component';
import { SectionContactsComponent } from './components/main/section-contacts/section-contacts.component';
import { HelpComponent } from './components/main/help/help.component';
import { ImpressumComponent } from './components/main/impressum/impressum.component';
import { DatenschutzComponent } from './components/main/datenschutz/datenschutz.component';
import { LoginComponent } from './components/login/login.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactDetailsComponent } from './components/main/section-contacts/contact-details/contact-details.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'kanban', redirectTo: 'kanban/summary' }, 
  {
    path: 'kanban', component: MainSiteComponent, children: [
      { path: 'summary', component: SectionSummaryComponent },
      { path: 'add-task', component: SectionAddTaskComponent  },
      { path: 'board', component: SectionBoardComponent },
      { path: 'imprint', component: ImpressumComponent },
      { path: 'privacy', component: DatenschutzComponent },
      { path: 'help', component: HelpComponent },
      { path: 'datenschutz', component: DatenschutzComponent },
      { path: 'impressum', component: ImpressumComponent },
      {
        path: 'contact-list', component: SectionContactsComponent, children: [
          { path: 'contact/:id', component: ContactDetailsComponent }
        ]
      },
       { path: '**', redirectTo: 'kanban' }
    ],
    canActivate: [AuthGuard]
  },
    { path: '**', redirectTo: 'login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      //useHash: true,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
