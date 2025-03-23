import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this

import { HttpClientModule } from '@angular/common/http';

// Import the components
import { StudentAddComponent } from './frontoffice/pages/student-add/student-add.component';
import { StudentListComponent } from './backoffice/pages/student-list/student-list.component';
import { StudentUpdateComponent } from './frontoffice/pages/student-update/student-update.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InternshipListComponent } from './internship-list/internship-list.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { StudentResponseComponent } from './student-response/student-response.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { ShowFeedbacksComponent } from './show-feedbacks/show-feedbacks.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { VideoCallComponent } from './video-call/video-call.component';


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
    VideoCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }