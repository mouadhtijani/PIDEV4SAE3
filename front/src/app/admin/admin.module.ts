import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { InternshipListComponent } from './internship-list/internship-list.component';
import { InternshipDetailsComponent } from './internship-details/internship-details.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStatsticComponent } from './user-statstic/user-statstic.component';
import { SharedModule } from 'src/shared/shared.module';
import { share } from 'rxjs';

@NgModule({
  declarations: [
    DashboardComponent,
    LeftSideBarComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    UserListComponent,
    UserDetailComponent,
    InternshipListComponent,
    InternshipDetailsComponent,
    ApplicationListComponent,
    ApplicationDetailsComponent,
    UserStatsticComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
