import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Input() event: Event = this.resetEvent();
  @Output() eventAdded = new EventEmitter<Event>();
  @Output() eventUpdated = new EventEmitter<Event>();

  constructor(private eventService: EventService) {}

  onSubmit() {
    if (!this.validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    this.addEvent();
  }

  addEvent() {
    this.eventService.createEvent(this.event).subscribe(
      (response) => {
        console.log('Événement ajouté avec succès!', response);
        this.eventAdded.emit(response);
        alert('Événement créé avec succès!');
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'événement :', error);
        alert('Une erreur est survenue.');
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

  resetForm() {
    this.event = this.resetEvent();
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
}
