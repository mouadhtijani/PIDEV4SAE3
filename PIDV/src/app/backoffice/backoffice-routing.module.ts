import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importez les composants que vous souhaitez associer aux routes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';

// Définissez les routes pour le module Backoffice
const routes: Routes = [
  {
    path: '', // Chemin vide (route par défaut pour ce module)
    component: DashboardComponent, // Associez le DashboardComponent à la route racine
  },
  {
    path: 'event-form', // Chemin pour accéder au formulaire d'événement
    component: EventFormComponent,
  },
  {
    path: 'event-list', // Chemin pour accéder à la liste des événements
    component: EventListComponent,
  },
  // Vous pouvez ajouter d'autres routes ici
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Utilisez forChild() pour les modules enfants
  exports: [RouterModule], // Exportez RouterModule pour permettre l'utilisation des routes
})
export class BackofficeRoutingModule { }