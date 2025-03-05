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
  event: Event = this.resetEvent(); // Initialisation de l'événement avec des valeurs par défaut

  @Output() eventUpdated = new EventEmitter<Event>();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      if (eventId) {
        this.getEvent(eventId);
      } else {
        console.error('Aucun ID d’événement trouvé dans l’URL.');
      }
    });
  }

  onSubmit() {
    if (this.event.id) {
      this.updateEvent(); // Appeler updateEvent si l'événement existe déjà
    } else {
      this.createEvent(); // Appeler createEvent pour un nouvel événement
    }
  }

  getEvent(eventId: number): void {
    this.eventService.getEvent(eventId).subscribe(
      (event: Event) => {
        if (event) {
          this.event = event;
          console.log('Données de l’événement chargées:', this.event);
        } else {
          console.warn('Aucun événement trouvé avec cet ID.');
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération de l'événement:", error);
        alert("Impossible de récupérer l'événement.");
      }
    );
  }

  updateEvent() {
    if (!this.validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.eventService.updateEvent(this.event.id, this.event).subscribe(
      (response) => {
        this.eventUpdated.emit(response);
        alert('Événement mis à jour avec succès!');
        this.router.navigate(['/event']);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
        alert("Une erreur est survenue lors de la mise à jour de l'événement.");
      }
    );
  }

  createEvent() {
    if (!this.validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.eventService.createEvent(this.event).subscribe(
      (response) => {
        alert('Événement créé avec succès!');
        this.router.navigate(['/event']);
      },
      (error) => {
        console.error("Erreur lors de la création de l'événement:", error);
        alert("Une erreur est survenue lors de la création de l'événement.");
      }
    );
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

  resetEvent(): Event {
    return {
      id: 0,
      title: '',
      description: '',
      eventType: 'CONFERENCE',
      category: '',
      status: '',
      startDate: '',
      endDate: '',
      timezone: '',
      location: '',
      maxAttendees: 0,
      aiGeneratedAgenda: false,
      chatbotEnabled: false,
      liveStreamingLink: '',
      gdprCompliant: false
    };
  }

  resetForm() {
    this.event = this.resetEvent();
  }
}