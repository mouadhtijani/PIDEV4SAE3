import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {HttpClient, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatSelectModule} from '@angular/material/select';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';
import { TopHotCompanyComponent } from './components/home-page/home-sub-components/top-hot-company/top-hot-company.component';
import { TopHotInternshipComponent } from './components/home-page/home-sub-components/top-hot-internship/top-hot-internship.component';
import { StatComponent } from './components/home-page/home-sub-components/stat/stat.component';
import { NewestMemberComponent } from './components/home-page/home-sub-components/newest-member/newest-member.component';
import { TopPageComponent } from './components/home-page/home-sub-components/top-page/top-page.component';
import { TestHomeComponent } from './components/test-home/test-home.component';




@NgModule({
  declarations: [
    AppComponent,
    CompanyRegisterComponent,
    StudentRegisterComponent,
    LoginComponent,
    RegisterComponent,
    ActivationAccountComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    TopHotCompanyComponent,
    TopHotInternshipComponent,
    StatComponent,
    NewestMemberComponent,
    TopPageComponent,
    TestHomeComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
