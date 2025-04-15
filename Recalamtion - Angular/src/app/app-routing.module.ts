import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './frontoffice/pages/landingpage/landingpage.component';
import { DashboardComponent } from './backoffice/pages/dashboard/dashboard.component';
import { StudentListComponent } from './backoffice/pages/student-list/student-list.component';
import { StudentAddComponent } from './frontoffice/pages/student-add/student-add.component'; 
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
import { ReclamationManagementComponent } from './backoffice/reclamation-management/reclamation-management.component'; // Assure-toi que ton composant est bien importé

const routes: Routes = [
  { path: 'front', component: LandingpageComponent }, // Home page
  { path: 'admin', component: DashboardComponent }, // Admin Dashboard
  { path: 'students', component: StudentListComponent }, // List of Students
  { path: 'students/add', component: StudentAddComponent }, // Add Student Page
  { path: 'students/update/:id', component: StudentUpdateComponent },
  { path: '', component: InternshipListComponent },
  { path: 'apply/:id', component: ApplicationFormComponent },
  { path: 'application-status', component: ApplicationStatusComponent },
  { path: 'student-response', component: StudentResponseComponent },
  { path: 'add-feedback/:id', component: AddFeedbackComponent },
  { path: 'show-feedbacks/:id', component: ShowFeedbacksComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'video-call', component: VideoCallComponent },
  { path: 'reclamation', component: ReclamationComponent },
  { path: '', redirectTo: 'front', pathMatch: 'full' },
  { path: '', redirectTo: 'reclamation', pathMatch: 'full' },
  { path: 'admin/reclamations', component: ReclamationManagementComponent }, // Nouvelle route pour la gestion des réclamations

  { path: '**', redirectTo: '' } // Default route if no match found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
