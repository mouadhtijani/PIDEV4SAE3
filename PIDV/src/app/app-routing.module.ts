import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './frontoffice/pages/landingpage/landingpage.component';
import { DashboardComponent } from './backoffice/pages/dashboard/dashboard.component';
import { EventListComponent } from './backoffice/event-list/event-list.component';
import { EventFormComponent } from './backoffice/event-form/event-form.component';
import { EventUpdateComponent } from './event-update/event-update.component'; // Importez EventUpdateComponent
import { EtudiantComponent } from './backoffice/etudiant/etudiant.component'; // Importez EtudiantComponent
import { SupervisorComponent } from './frontoffice/supervisor/supervisor.component';
import { EventComponent } from './frontoffice/event/event.component'; // Importez SupervisorComponent
const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'event', component: EventListComponent },
  { path: 'event/add', component: EventFormComponent },
  { path: 'event/update/:id', component: EventUpdateComponent }, // Ajoutez cette ligne
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'supervisor', component: SupervisorComponent },
  { path: 'events', component: EventComponent },// Ajoutez cette ligne pour EtudiantComponent
  { path: '**', redirectTo: '' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }