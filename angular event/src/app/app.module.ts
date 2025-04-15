import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './backoffice/event-form/event-form.component';
import { EventListComponent } from './backoffice/event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { EventUpdateComponent } from './event-update/event-update.component'; // Import FormsModule
import { EtudiantComponent } from './backoffice/etudiant/etudiant.component';
import { SupervisorComponent } from './frontoffice/supervisor/supervisor.component';
import { EventComponent } from './frontoffice/event/event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';




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
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule, // Obligatoire AVANT Toastr
    ToastrModule.forRoot(), 
    
    FullCalendarModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
