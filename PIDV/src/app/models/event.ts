export class Event {
  id: number;
  title: string;
  description: string;
  eventType: 'CONFERENCE' | 'WORKSHOP' | 'WEBINAR' | 'HACKATHON' | 'NETWORKING';
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  timezone: string;
  location: string;
  maxAttendees: number;
  aiGeneratedAgenda: boolean;
  chatbotEnabled: boolean;
  liveStreamingLink: string;
  gdprCompliant: boolean;
  latitude?: number; // Ajout de la propriété latitude
  longitude?: number; // Ajout de la propriété longitude

  constructor() {
    // Initialisation par défaut (si nécessaire)
    this.id = 0; // Par exemple, initialiser à 0 si tu veux que ce soit un identifiant vide avant d'être affecté par la base
    this.title = '';
    this.description = '';
    this.eventType = 'CONFERENCE';
    this.category = '';
    this.status = '';
    this.startDate = '';
    this.endDate = '';
    this.timezone = '';
    this.location = '';
    this.maxAttendees = 0;
    this.aiGeneratedAgenda = false;
    this.chatbotEnabled = false;
    this.liveStreamingLink = '';
    this.gdprCompliant = false;
    this.latitude = undefined; // Initialisation par défaut
    this.longitude = undefined; // Initialisation par défaut
  }
}