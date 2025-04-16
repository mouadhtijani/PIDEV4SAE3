import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommunityComponent } from './pages/community/community.component';
import { PostsComponent } from './pages/posts/posts.component';
import { RagQueryComponent } from './pages/rag-query/rag-query.component';
@NgModule({
  declarations: [
    LandingpageComponent,
    CommunityComponent,
    PostsComponent,
    RagQueryComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class FrontofficeModule { }
