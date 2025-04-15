import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { FormsModule } from '@angular/forms';
import { BackofficeRoutingModule } from './backoffice-routing.module';  // Import routing module
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReclamationManagementComponent } from './reclamation-management/reclamation-management.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent,
    ReclamationManagementComponent,
  
   // Ensure ReclamationResponseComponent is declared here
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,  // Add RouterModule to enable [routerLink] in the templates
    BackofficeRoutingModule  // Import routing module for backoffice
  ]
})
export class BackofficeModule { }
