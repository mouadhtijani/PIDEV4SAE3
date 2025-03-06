import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: Event[] = [];
  eventToEdit: Event | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des événements :", error);
      }
    });
  }

  onEventAdded(newEvent: Event): void {
    this.events.push(newEvent);
  }

  onEventUpdated(updatedEvent: Event): void {
    const index = this.events.findIndex(event => event.eventId === updatedEvent.eventId);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
    this.eventToEdit = null; // Réinitialiser l'événement à éditer
  }

  onEditEvent(event: Event): void {
    this.eventToEdit = { ...event }; // Copie de l'événement pour l'édition
  }

  onDeleteEvent(eventId: number): void {
    this.events = this.events.filter(event => event.eventId !== eventId);
  }
}