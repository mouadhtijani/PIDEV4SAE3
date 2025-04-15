import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  event: Event = this.getEmptyEvent();
  isEditMode: boolean = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      const eventId = +idParam;
      this.eventService.getEventById(eventId).subscribe({
        next: (data) => this.event = data,
        error: (err) => console.error('Erreur lors de la récupération de l’événement :', err)
      });
    }
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Formatage des dates ISO pour le backend
    this.event.startDate = this.formatDateToISOString(this.event.startDate);
    this.event.endDate = this.formatDateToISOString(this.event.endDate);

    const submitRequest = this.isEditMode
      ? this.eventService.updateEvent(this.event.eventId, this.event)
      : this.eventService.createEvent(this.event);

    submitRequest.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Événement mis à jour avec succès !' : 'Événement ajouté avec succès !');
        this.router.navigate(['/event']);
      },
      error: (err) => {
        console.error('Erreur lors de la soumission :', err);
        alert('Erreur lors de la soumission.');
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
    this.event = this.getEmptyEvent();
  }

  getEmptyEvent(): Event {
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
      interestedCount: 0,
      notInterestedCount: 0,
      somewhatInterestedCount: 0,
      latitude: 0,
      longitude: 0,
      
      aiGeneratedAgenda: false,
      chatbotEnabled: false,
      
      liveStreamingLink: '',
      
      gdprCompliant: true,
      
    };
  }

  formatDateToISOString(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  
  
}
