import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Combine FormsModule et ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StudentAddComponent } from './frontoffice/pages/student-add/student-add.component';
import { StudentListComponent } from './backoffice/pages/student-list/student-list.component';
import { StudentUpdateComponent } from './frontoffice/pages/student-update/student-update.component';
import { InternshipListComponent } from './internship-list/internship-list.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { StudentResponseComponent } from './student-response/student-response.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { ShowFeedbacksComponent } from './show-feedbacks/show-feedbacks.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

import { RouterModule } from '@angular/router';
import { BackofficeModule } from './backoffice/backoffice.module';

@NgModule({
  declarations: [
    AppComponent,
    StudentAddComponent,
    StudentListComponent,
    StudentUpdateComponent,
    InternshipListComponent,
    ApplicationFormComponent,
    ApplicationStatusComponent,
    StudentResponseComponent,
    AddFeedbackComponent,
    ShowFeedbacksComponent,
    ChatbotComponent,
    VideoCallComponent,
    ReclamationComponent // Assurez-vous d'ajouter ReclamationComponent ici
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Garde une seule ligne pour FormsModule
    ReactiveFormsModule, // Garde ReactiveFormsModule si nécessaire
    NgxChartsModule,
    HttpClientModule,
    RouterModule,
    BackofficeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000, // 3 secondes pour les notifications
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
