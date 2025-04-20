import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminReclamationsComponent } from './pages/admin-reclamations/admin-reclamations.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminReclamationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
