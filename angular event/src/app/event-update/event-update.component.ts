import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  event: Event = this.resetEvent(); // Initialisation de l'événement

  @Output() eventUpdated = new EventEmitter<Event>();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const eventId = id ? +id : null;

    if (eventId) {
      this.getEvent(eventId);
    } else {
      console.error('Aucun ID d’événement trouvé dans l’URL.');
    }
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (this.event.eventId) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }

  getEvent(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (event: Event) => {
        if (event) {
          this.event = event;
          console.log('Données de l’événement chargées:', this.event);
        } else {
          console.warn('Aucun événement trouvé avec cet ID.');
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'événement:", err);
        alert("Impossible de récupérer l'événement.");
      }
    });
  }

  updateEvent(): void {
    this.eventService.updateEvent(this.event.eventId, this.event).subscribe({
      next: (response: Event) => {
        this.eventUpdated.emit(response);
        alert('Événement mis à jour avec succès!');
        this.router.navigate(['/event']);
      },
      error: (error) => {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
        alert("Une erreur est survenue lors de la mise à jour.");
      }
    });
  }

  createEvent(): void {
    this.eventService.createEvent(this.event).subscribe({
      next: () => {
        alert('Événement créé avec succès!');
        this.router.navigate(['/event']);
      },
      error: (error) => {
        console.error("Erreur lors de la création de l'événement:", error);
        alert("Une erreur est survenue lors de la création.");
      }
    });
  }

  validateForm(): boolean {
    return !!(
      this.event.title &&
      this.event.description &&
      this.event.category &&
      this.event.status &&
      this.event.startDate &&
      this.event.endDate &&
      this.event.location
    );
  }

  resetForm(): void {
    this.event = this.resetEvent();
  }

  resetEvent(): Event {
    return {
      eventId: 0,
      title: '',
      description: '',
      eventType: 'CONFERENCE',
      category: '',
      status: 'ACTIVE',
      startDate: '',
      endDate: '',
      timezone: 'UTC',
      location: '',
      maxAttendees: 0,
      aiGeneratedAgenda: false,
      chatbotEnabled: false,
      liveStreamingLink: '',
      gdprCompliant: true,
      interestedCount: 0,
      notInterestedCount: 0,
      somewhatInterestedCount: 0,
      latitude: 0,
      longitude: 0
    };
  }
}
  