import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReclamationManagementComponent } from './reclamation-management/reclamation-management.component'; // Import your component
const routes: Routes = [
  { path: '', component: DashboardComponent }, 
  { path: 'backoffice/reclamations', component: ReclamationManagementComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Use forChild for feature module routing
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
