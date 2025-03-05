import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { InternshipListComponent } from './internship-list/internship-list.component';
import { InternshipDetailsComponent } from './internship-details/internship-details.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { UserStatsticComponent } from './user-statstic/user-statstic.component';
const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      { path: 'all-company', component: CompanyListComponent },
      { path: 'all-company/:id-company', component: CompanyDetailsComponent },
      { path: 'all-user', component: UserListComponent },
      { path: 'all-user/:id-user', component: UserDetailComponent },
      { path: 'stat/user', component: UserStatsticComponent },
    
     

    ] 
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
