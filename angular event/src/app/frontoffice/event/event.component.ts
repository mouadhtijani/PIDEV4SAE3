import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { ChangeDetectorRef } from '@angular/core';
import * as QRCode from 'qrcode';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClient } from '@angular/common/http';

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
  sortBy: keyof Event = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  interestStats: { [key: number]: { interested: number; slightly_interested: number; not_interested: number } } = {};
  recommendations: Event[] = [];
  qrcodeUrl: string = '';
  qrcodeGenerated: boolean = false;
  calendarOptions: CalendarOptions = {};

  chatOpen: boolean = false;
  chatMessages: { user: boolean, message: string }[] = [];
  chatInput: string = '';

  constructor(private eventService: EventService, private cdRef: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();
    this.calendarOptions = {
      plugins: [dayGridPlugin],
    };
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.filteredEvents = events;
      this.initializeInterestStats();
      this.paginateEvents();

      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: this.events.map(event => ({
          title: event.title,
          start: new Date(event.startDate).toISOString(),
          end: new Date(event.endDate).toISOString(),
          extendedProps: { eventId: event.eventId, location: event.location }
        })),
        datesSet: (arg) => this.handleDateClick(arg),
        eventClick: this.handleEventClick.bind(this),
      };
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
      if (aValue === undefined || bValue === undefined) return 0;
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
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

  expressInterest(event: Event, interestLevel: string): void {
    if (!event || !event.eventId) return;
    let updatedEvent: Event;
    switch (interestLevel) {
      case 'interested': updatedEvent = { ...event, interestedCount: event.interestedCount + 1 }; break;
      case 'not_interested': updatedEvent = { ...event, notInterestedCount: event.notInterestedCount + 1 }; break;
      case 'slightly_interested': updatedEvent = { ...event, somewhatInterestedCount: event.somewhatInterestedCount + 1 }; break;
      default: return;
    }
    this.eventService.reactToEvent(event.eventId, interestLevel).subscribe({
      next: () => {
        const index = this.events.findIndex((e) => e.eventId === event.eventId);
        if (index !== -1) this.events[index] = updatedEvent;
        if (this.selectedEvent?.eventId === event.eventId) this.selectedEvent = updatedEvent;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loadEvents();
      },
    });
  }

  openEventDetails(event: Event): void {
    this.selectedEvent = event;
    this.qrcodeUrl = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`;
  }

  closeEventDetails(): void {
    this.selectedEvent = null;
  }

  filterEvents(event: InputEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.events.filter(
      (e) => e.title.toLowerCase().includes(searchTerm) || e.description.toLowerCase().includes(searchTerm)
    );
    this.paginateEvents();
  }

  markInterested(eventId: number): void {
    this.ensureEventStats(eventId);
    this.interestStats[eventId].interested++;
    this.saveInterestStats();
  }

  markSlightlyInterested(eventId: number): void {
    this.ensureEventStats(eventId);
    this.interestStats[eventId].slightly_interested++;
    this.saveInterestStats();
  }

  markNotInterested(eventId: number): void {
    this.ensureEventStats(eventId);
    this.interestStats[eventId].not_interested++;
    this.saveInterestStats();
  }

  ensureEventStats(eventId: number): void {
    if (!this.interestStats[eventId]) {
      this.interestStats[eventId] = { interested: 0, slightly_interested: 0, not_interested: 0 };
    }
  }

  calculateSimilarity(event1: Event, event2: Event): number {
    let score = 0;
    if (event1.category === event2.category) score += 3;
    const keywords1 = (event1.title + ' ' + event1.description).toLowerCase().split(/\s+/);
    const keywords2 = (event2.title + ' ' + event2.description).toLowerCase().split(/\s+/);
    const common = [...new Set(keywords1)].filter(word => new Set(keywords2).has(word));
    score += common.length;
    const i1 = this.interestStats[event1.eventId]?.interested || 0;
    const i2 = this.interestStats[event2.eventId]?.interested || 0;
    score += Math.min(i1, i2) / 2;
    return score;
  }

  generateRecommendations(selectedEvent: Event): void {
    const scores = this.events.filter(e => e.eventId !== selectedEvent.eventId).map(event => ({
      event,
      score: this.calculateSimilarity(selectedEvent, event),
    }));
    this.recommendations = scores.sort((a, b) => b.score - a.score).slice(0, 3).map(r => r.event);
  }

  viewRecommendations(event: Event): void {
    this.generateRecommendations(event);
  }

  generateQRCode(): void {
    if (this.selectedEvent && this.selectedEvent.latitude && this.selectedEvent.longitude) {
      const location = `https://www.google.com/maps?q=${this.selectedEvent.latitude},${this.selectedEvent.longitude}`;
      QRCode.toDataURL(location).then((url: string) => {
        this.qrcodeUrl = url;
        this.qrcodeGenerated = true;
      }).catch((err: unknown) => {
        console.error('Error generating QR code:', err);
        this.qrcodeGenerated = false;
      });
    } else {
      alert('The event location is missing latitude and longitude.');
    }
  }

  handleDateClick(arg: any): void {
    console.log('Date clicked:', arg.dateStr);
  }

  handleEventClick(arg: any): void {
    const eventId = arg.event.extendedProps.eventId;
    this.selectedEvent = this.events.find(event => event.eventId === eventId) || null;
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.events.map(e => e.category))];
  }

  filterByCategory(category: string): void {
    this.filteredEvents = category 
      ? this.events.filter(e => e.category === category)
      : this.events;
    this.paginateEvents();
  }

  sendTestNotification(): void {
    this.http.post('http://localhost:3000/api/notify', {
      message: 'Ceci est une notification test depuis Angular \ud83d\ude80'
    }).subscribe({
      next: () => console.log('✅ Notification envoyée avec succès'),
      error: err => console.error('❌ Erreur d\'envoi de notification :', err)
    });
  }

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
  }

  sendChatMessage(): void {
    const trimmed = this.chatInput.trim();
    if (!trimmed) return;
  
    this.chatMessages.push({ user: true, message: trimmed });
  
    if (trimmed === 'reset') {
      this.chatMessages = [];
      this.chatMessages.push({ user: false, message: '💬 Chat réinitialisé.' });
    } else {
      const response = this.generateBotResponse(trimmed);
      this.chatMessages.push({ user: false, message: response });
    }
  
    this.chatInput = '';
  }

  generateBotResponse(message: string): string {
    const lower = message.toLowerCase();
  
    // Prochains événements
    if (lower.includes('prochain') || lower.includes('à venir') || lower.includes('bientôt')) {
      const nextEvents = this.events
        .slice(0, 5)
        .map(e => `• ${e.title} (${new Date(e.startDate).toLocaleDateString()})`)
        .join('\n');
      return `📅 Voici les événements à venir :\n${nextEvents}`;
    }
  
    // Événements à Paris ou autre ville
    const cityMatch = lower.match(/à\s+([a-z]+)/i);
    if (cityMatch) {
      const city = cityMatch[1];
      const cityEvents = this.events.filter(e => e.location.toLowerCase().includes(city));
      return cityEvents.length
        ? `📍 ${cityEvents.length} événement(s) trouvé(s) à ${city}.\n${cityEvents.map(e => '• ' + e.title).join('\n')}`
        : `❌ Aucun événement trouvé à ${city}.`;
    }
  
    // Webinars
    if (lower.includes('webinar') || lower.includes('en ligne')) {
      const webinars = this.events.filter(e => e.eventType?.toLowerCase().includes('webinar'));
      return webinars.length
        ? `💻 ${webinars.length} webinar(s) disponibles :\n${webinars.map(e => '• ' + e.title).join('\n')}`
        : `📭 Aucun webinar prévu pour l’instant.`;
    }
  
    // Gratuit
    
  
    // Aujourd’hui
    if (lower.includes("aujourd'hui") || lower.includes('ce jour')) {
      const today = new Date().toISOString().split('T')[0];
      const todayEvents = this.events.filter(e => e.startDate.startsWith(today));
      return todayEvents.length
        ? `📆 Aujourd’hui, voici ce qu’il se passe :\n${todayEvents.map(e => '• ' + e.title).join('\n')}`
        : `📭 Rien de prévu aujourd’hui.`;
    }
  
    // Nombre total
    if (lower.includes('nombre') || lower.includes('combien') || lower.includes('total')) {
      return `🔢 Il y a actuellement ${this.events.length} événement(s) dans la base de données.`;
    }
  
    // Catégories
    if (lower.includes('catégorie') || lower.includes('type')) {
      const categories = [...new Set(this.events.map(e => e.category))].filter(Boolean);
      return categories.length
        ? `📂 Les types d’événements disponibles sont : ${categories.join(', ')}`
        : `😅 Aucune catégorie enregistrée pour le moment.`;
    }
  
    // Lieux disponibles
    if (lower.includes('lieux') || lower.includes('où') || lower.includes('localisation')) {
      const locations = [...new Set(this.events.map(e => e.location))].filter(Boolean);
      return locations.length
        ? `🌍 Les lieux disponibles sont : ${locations.join(', ')}`
        : `🤷 Aucun lieu défini.`;
    }
  
    // Événements populaires (par intérêt)
    if (lower.includes('populaire') || lower.includes('les plus aimés')) {
      const topEvents = [...this.events]
        .sort((a, b) => (b.interestedCount || 0) - (a.interestedCount || 0))
        .slice(0, 3)
        .map(e => `• ${e.title} (${e.interestedCount || 0} intéressé(s))`)
        .join('\n');
      return `🔥 Voici les événements les plus populaires :\n${topEvents}`;
    }
  
    // Aide
    if (lower.includes('aide') || lower.includes('help') || lower.includes('?')) {
      return `🤖 Voici quelques exemples de questions que tu peux poser :\n
  - "Quels sont les prochains événements ?"
  - "Y a-t-il des événements à Paris ?"
  - "Combien y a-t-il d'événements ?"
  - "Quels sont les événements gratuits ?"
  - "Quels types d'événements existe-t-il ?"
  - "Y a-t-il des webinars ?"
  - "Quels sont les événements populaires ?"
  - "Quels lieux sont disponibles ?"
      `;
    }
  
    // Réponse par défaut
    return `🤷 Je ne comprends pas encore cette question. Essaie par exemple : "prochains événements", "événements gratuits", "événements à Paris", "catégories", "populaires"...`;
  }
  startVoiceRecognition(): void {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('❌ Reconnaissance vocale non supportée dans ce navigateur.');
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
  
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.chatInput = transcript;
      this.sendChatMessage();
    };
  
    recognition.onerror = (event: any) => {
      console.error('Erreur vocale :', event.error);
    };
  
    recognition.start();
  }
  
  
}
