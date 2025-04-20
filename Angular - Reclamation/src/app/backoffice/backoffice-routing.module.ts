import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReclamationsComponent } from './pages/admin-reclamations/admin-reclamations.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent 
},
{ 
    path: 'reclamations',  // Le path final sera /admin/reclamations
    component: AdminReclamationsComponent 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }