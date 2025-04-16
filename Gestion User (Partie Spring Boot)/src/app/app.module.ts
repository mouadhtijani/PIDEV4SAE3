import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommunityService } from './services/community.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommunityComponent } from './frontoffice/pages/community/community.component';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './frontoffice/pages/posts/posts.component';
import { CommunityBackComponent } from './backoffice/pages/community-back/community-back.component';
import { PostsBackComponent } from './backoffice/pages/posts-back/posts-back.component';
import { RepliesBackComponent } from './backoffice/pages/replies-back/replies-back.component';
import { ReportsComponent } from './backoffice/pages/reports/reports.component';
import { NgChartsModule } from 'ng2-charts';
import { RagQueryComponent } from './frontoffice/pages/rag-query/rag-query.component';
@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent,
    PostsComponent,
    CommunityBackComponent,
    PostsBackComponent,
    RepliesBackComponent,
    ReportsComponent,
    RagQueryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [CommunityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
