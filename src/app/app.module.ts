import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/main/header/header.component';
import { SectionSummaryComponent } from './components/main/section-summary/section-summary.component';
import { SectionBoardComponent } from './components/main/section-board/section-board.component';
import { SectionAddTaskComponent } from './components/main/section-add-task/section-add-task.component';
import { SectionContactsComponent } from './components/main/section-contacts/section-contacts.component';
import { ImpressumComponent } from './components/main/impressum/impressum.component';
import { DatenschutzComponent } from './components/main/datenschutz/datenschutz.component';
import { LoginComponent } from './components/login/login.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HelloComponent } from './components/main/hello/hello.component';
import { ContactDetailsComponent } from './components/main/section-contacts/contact-details/contact-details.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AddContactComponent } from './components/main/section-contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/main/section-contacts/edit-contact/edit-contact.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomformcontrolModule } from './modules/customformcontrol/customformcontrol.module';
import { FeedbackMessageComponent } from './components/feedback-message/feedback-message.component';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayComponent } from './components/main-site/overlay/overlay.component';
import { TaskDetailsComponent } from './components/main/section-board/task-details/task-details.component';
import { EditTaskComponent } from './components/main/section-board/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/main/section-board/delete-task/delete-task.component';
import { SubMenuComponent } from './components/main/sub-menu/sub-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    HeaderComponent,
    SectionSummaryComponent,
    SectionBoardComponent,
    SectionAddTaskComponent,
    SectionContactsComponent,
    ImpressumComponent,
    DatenschutzComponent,
    LoginComponent,
    MainSiteComponent,
    SignUpComponent,
    HelloComponent,
    ContactDetailsComponent,
    AddContactComponent,
    EditContactComponent,
    FeedbackMessageComponent,
    OverlayComponent,
    TaskDetailsComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    SubMenuComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [CustomformcontrolModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
