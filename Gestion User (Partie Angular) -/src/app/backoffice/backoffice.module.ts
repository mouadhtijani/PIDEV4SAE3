import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommunityBackComponent } from './pages/community-back/community-back.component';
import { PostsBackComponent } from './pages/posts-back/posts-back.component';
import { RepliesBackComponent } from './pages/replies-back/replies-back.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CommunityBackComponent,
    PostsBackComponent,
    RepliesBackComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
