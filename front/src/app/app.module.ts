import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommunityService } from './services/community.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunityComponent } from './frontoffice/pages/community/community.component';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './frontoffice/pages/posts/posts.component';
import { CommunityBackComponent } from './backoffice/pages/community-back/community-back.component';
import { PostsBackComponent } from './backoffice/pages/posts-back/posts-back.component';
import { RepliesBackComponent } from './backoffice/pages/replies-back/replies-back.component';
import { ReportsComponent } from './backoffice/pages/reports/reports.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';
import { TopHotCompanyComponent } from './components/home-page/home-sub-components/top-hot-company/top-hot-company.component';
import { TopHotInternshipComponent } from './components/home-page/home-sub-components/top-hot-internship/top-hot-internship.component';
import { StatComponent } from './components/home-page/home-sub-components/stat/stat.component';
import { NewestMemberComponent } from './components/home-page/home-sub-components/newest-member/newest-member.component';
import { TopPageComponent } from './components/home-page/home-sub-components/top-page/top-page.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { SharedModule } from 'src/shared/shared.module';
import { RagQueryComponent } from './frontoffice/pages/rag-query/rag-query.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent,
    PostsComponent,
    CommunityBackComponent,
    PostsBackComponent,
    RepliesBackComponent,
    ReportsComponent,
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
    RagQueryComponent,


  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    NgxPaginationModule,
    SharedModule
  ],
  providers: [CommunityService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }