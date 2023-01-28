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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
