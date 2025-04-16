import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { AuthGuard } from './auth.guard';
import { TestHomeComponent } from './components/test-home/test-home.component';
//import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CommunityBackComponent } from './backoffice/pages/community-back/community-back.component';
import { PostsBackComponent } from './backoffice/pages/posts-back/posts-back.component';
import { RepliesBackComponent } from './backoffice/pages/replies-back/replies-back.component';
import { ReportsComponent } from './backoffice/pages/reports/reports.component';
import { CommunityComponent } from './frontoffice/pages/community/community.component';
import { PostsComponent } from './frontoffice/pages/posts/posts.component';
import { RagQueryComponent } from './frontoffice/pages/rag-query/rag-query.component';
import { DashboardComponent } from './backoffice/pages/dashboard/dashboard.component';

import { LandingpageComponent } from './frontoffice/pages/landingpage/landingpage.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to register by default

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {  path: 'register', component: RegisterComponent},
  { path: 'register/student', component: StudentRegisterComponent },
  { path: 'register/company', component: CompanyRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activate-account', component: ActivationAccountComponent },
  { path: 'activate-company', component: ActivationAccountComponent },

  { path: 'homepage', component: TestHomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/community', component: CommunityBackComponent },
  { path: 'admin/posts', component: PostsBackComponent },
  { path: 'admin/replies', component: RepliesBackComponent },
  { path: 'admin/reports', component: ReportsComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: 'chat', component: RagQueryComponent },
  { path: 'landing', component:LandingpageComponent},






  { path: '**', redirectTo: 'homepage' } // Wildcard route for handling 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
