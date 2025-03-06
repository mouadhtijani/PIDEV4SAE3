// models/event.ts
export class Event {
  eventId: number;
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
  interestedCount: number; // Required property
  notInterestedCount: number; // Required property
  somewhatInterestedCount: number; // Required property

  constructor() {
    this.eventId = 0;
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
    this.interestedCount = 0; // Initialize to 0
    this.notInterestedCount = 0; // Initialize to 0
    this.somewhatInterestedCount = 0; // Initialize to 0
  }
}