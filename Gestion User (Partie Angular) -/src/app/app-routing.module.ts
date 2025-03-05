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
const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {  path: 'register', component: RegisterComponent},
  { path: 'register/student', component: StudentRegisterComponent },
  { path: 'register/company', component: CompanyRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activate-account', component: ActivationAccountComponent },
  { path: 'activate-company', component: ActivationAccountComponent },

  { path: 'homepage', component: TestHomeComponent },
  { path: 'login', component: LoginComponent },








  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to register by default
  { path: '**', redirectTo: 'homepage' } // Wildcard route for handling 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
