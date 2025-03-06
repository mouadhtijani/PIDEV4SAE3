import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service'; // Adjust the import path as needed
import { Event } from 'src/app/models/event'; // Your custom Event model
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  paginatedEvents: Event[] = [];
  selectedEvent: Event | null = null;
  sortBy: keyof Event = 'title'; // Use keyof to restrict to valid properties
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  interestStats: { [key: number]: { interested: number; slightly_interested: number; not_interested: number } } = {};
  recommendations: Event[] = [];
  qrcodeUrl: string = ''; // URL pour le QR code (lien vers Google Maps)

  constructor(private eventService: EventService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.filteredEvents = events;
      this.initializeInterestStats();
      this.paginateEvents();
      console.log('📊 interestStats après chargement :', this.interestStats);
    });
  }

  initializeInterestStats(): void {
    const savedStats = localStorage.getItem('interestStats');
    if (savedStats) {
      this.interestStats = JSON.parse(savedStats);
    } else {
      this.events.forEach((event) => {
        this.interestStats[event.eventId] = {
          interested: 0,
          slightly_interested: 0,
          not_interested: 0,
        };
      });
      this.saveInterestStats();
    }
  }

  saveInterestStats(): void {
    localStorage.setItem('interestStats', JSON.stringify(this.interestStats));
  }

  sortEvents(property: keyof Event): void {
    this.filteredEvents.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];

      if (aValue === undefined || bValue === undefined) {
        return 0; // Si l'une des valeurs est undefined, ne changez pas l'ordre
      }

      if (aValue > bValue) return 1;
      if (aValue < bValue) return -1;
      return 0;
    });
    this.paginateEvents();
  }

  paginateEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, startIndex + this.itemsPerPage);
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateEvents();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateEvents();
    }
  }

  // event.component.ts
expressInterest(event: Event, interestLevel: string): void {
  if (!event || !event.eventId) {
    console.error('Event ID is undefined or invalid.');
    return;
  }

  let message = '';
  let updatedEvent: Event;

  // Update the local reaction counts
  switch (interestLevel) {
    case 'interested':
      message = `Vous êtes intéressé par l'événement : ${event.title}`;
      updatedEvent = { ...event, interestedCount: event.interestedCount + 1 };
      break;
    case 'not_interested':
      message = `Vous n'êtes pas intéressé par l'événement : ${event.title}`;
      updatedEvent = { ...event, notInterestedCount: event.notInterestedCount + 1 };
      break;
    case 'slightly_interested':
      message = `Vous êtes peu intéressé par l'événement : ${event.title}`;
      updatedEvent = { ...event, somewhatInterestedCount: event.somewhatInterestedCount + 1 };
      break;
    default:
      console.error('Invalid reaction type:', interestLevel);
      return;
  }

  // Call the backend to update the reaction
  this.eventService.reactToEvent(event.eventId, interestLevel).subscribe({
    next: () => {
      alert(message);

      // Update the specific event in the list
      const index = this.events.findIndex((e) => e.eventId === event.eventId);
      if (index !== -1) {
        this.events[index] = updatedEvent; // Update the event in the list
      }

      // If the selected event is open, update its details
      if (this.selectedEvent && this.selectedEvent.eventId === event.eventId) {
        this.selectedEvent = updatedEvent;
      }
    },
    error: (err) => {
      console.error('Failed to save reaction:', err);
      alert('reaction added.');
      this.loadEvents();  // Assuming loadEvents is a method to fetch events

    },
  });
}

  openEventDetails(event: Event): void {
    this.selectedEvent = event;
    console.log('Détails de l\'événement ouverts:', this.selectedEvent);
  }

  closeEventDetails(): void {
    this.selectedEvent = null; // This will clear the selected event
  }

  filterEvents(event: InputEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.events.filter(
      (e) =>
        e.title.toLowerCase().includes(searchTerm) ||
        e.description.toLowerCase().includes(searchTerm)
    );
    this.paginateEvents();
  }

  // Méthodes pour enregistrer les intérêts
  markInterested(eventId: number): void {
    this.ensureEventStats(eventId);
    this.interestStats = {
      ...this.interestStats,
      [eventId]: {
        ...this.interestStats[eventId],
        interested: (this.interestStats[eventId].interested || 0) + 1,
      },
    };
    this.saveInterestStats();
    console.log(`✅ Intérêt ajouté pour l'événement ${eventId}:`, this.interestStats[eventId]);
  }

  markSlightlyInterested(eventId: number): void {
    this.ensureEventStats(eventId);
    this.interestStats = {
      ...this.interestStats,
      [eventId]: {
        ...this.interestStats[eventId],
        slightly_interested: (this.interestStats[eventId].slightly_interested || 0) + 1,
      },
    };
    this.saveInterestStats();
    console.log(`✅ Peu d'intérêt ajouté pour l'événement ${eventId}:`, this.interestStats[eventId]);
  }

  markNotInterested(eventId: number): void {
    this.ensureEventStats(eventId);
    this.interestStats = {
      ...this.interestStats,
      [eventId]: {
        ...this.interestStats[eventId],
        not_interested: (this.interestStats[eventId].not_interested || 0) + 1,
      },
    };
    this.saveInterestStats();
    console.log(`✅ Désintérêt ajouté pour l'événement ${eventId}:`, this.interestStats[eventId]);
  }

  // Vérifie si l'événement a déjà des statistiques, sinon les initialise.
  ensureEventStats(eventId: number): void {
    if (!this.interestStats[eventId]) {
      this.interestStats[eventId] = { interested: 0, slightly_interested: 0, not_interested: 0 };
    }
  }

  // Méthodes pour générer des recommandations
  calculateSimilarity(event1: Event, event2: Event): number {
    let score = 0;

    // Comparaison par catégories
    if (event1.category && event2.category && event1.category === event2.category) {
      score += 3;
    }

    // Comparaison par mots-clés dans les titres/descriptions
    const keywords1 = (event1.title + ' ' + event1.description).toLowerCase().split(/\s+/);
    const keywords2 = (event2.title + ' ' + event2.description).toLowerCase().split(/\s+/);

    const uniqueKeywords1 = [...new Set(keywords1)]; // Évite les doublons
    const uniqueKeywords2 = [...new Set(keywords2)];

    const commonKeywords = uniqueKeywords1.filter((word) => uniqueKeywords2.includes(word));
    score += commonKeywords.length;

    // Bonus pour les événements populaires
    const interestCount1 = this.interestStats[event1.eventId]?.interested || 0;
    const interestCount2 = this.interestStats[event2.eventId]?.interested || 0;
    score += Math.min(interestCount1, interestCount2) / 2;

    return score;
  }

  generateRecommendations(selectedEvent: Event): void {
    if (!selectedEvent || !this.events) {
      console.error('Événement sélectionné ou liste des événements non définie.');
      return;
    }

    const scores = this.events
      .filter((event) => event.eventId !== selectedEvent.eventId)
      .map((event) => ({
        event,
        score: this.calculateSimilarity(selectedEvent, event),
      }));

    console.log('Scores de similarité:', scores); // Debug

    this.recommendations = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((result) => result.event);

    console.log('Recommandations générées:', this.recommendations); // Debug
  }

  viewRecommendations(event: Event): void {
    if (!event) {
      console.error('Aucun événement sélectionné.');
      return;
    }

    this.generateRecommendations(event);
    console.log('Recommandations pour', event.title, ':', this.recommendations);
  }
}