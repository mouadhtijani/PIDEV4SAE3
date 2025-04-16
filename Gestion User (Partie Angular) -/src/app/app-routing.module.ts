import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './frontoffice/pages/landingpage/landingpage.component';
import { DashboardComponent } from './backoffice/pages/dashboard/dashboard.component';
import { CommunityComponent } from './frontoffice/pages/community/community.component';
import { PostsComponent } from './frontoffice/pages/posts/posts.component';
import { CommunityBackComponent } from './backoffice/pages/community-back/community-back.component';
import { PostsBackComponent } from './backoffice/pages/posts-back/posts-back.component';
import { RepliesBackComponent } from './backoffice/pages/replies-back/replies-back.component';
import { ReportsComponent } from './backoffice/pages/reports/reports.component';

const routes: Routes = [{ path: '', component: CommunityComponent }, 
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/community', component: CommunityBackComponent },
  { path: 'admin/posts', component: PostsBackComponent },
  { path: 'admin/replies', component: RepliesBackComponent },
  { path: 'admin/reports', component: ReportsComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
