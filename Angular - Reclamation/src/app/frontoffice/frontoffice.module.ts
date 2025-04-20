import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReclamationComponent } from './pages/reclamation/reclamation.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingpageComponent,
    ReclamationComponent,


  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCardModule
  ]
})
export class FrontofficeModule { }
