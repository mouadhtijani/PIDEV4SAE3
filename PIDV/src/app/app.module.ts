import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './backoffice/event-form/event-form.component';
import { EventListComponent } from './backoffice/event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule
import { FormsModule } from '@angular/forms';
import { EventUpdateComponent } from './event-update/event-update.component'; // Importez FormsModule
import { EtudiantComponent } from './backoffice/etudiant/etudiant.component';
import { SupervisorComponent } from './frontoffice/supervisor/supervisor.component';
import { EventComponent } from './frontoffice/event/event.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    EventListComponent,
    EtudiantComponent,
    SupervisorComponent,
    EventComponent,
    
    EventUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Ajoutez HttpClientModule ici
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
   
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
