// services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Event } from '../models/event';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8081/event/api/events'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      tap((data) => console.log('Server response:', data)),
      catchError(this.handleError)
    );
  }

  // Get a single event by ID
  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`).pipe(
      tap((event) => console.log('Event data:', event)),
      catchError(this.handleError)
    );
  }

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      tap((createdEvent) => console.log('Event created:', createdEvent)),
      catchError(this.handleError)
    );
  }

  // Update an existing event
  updateEvent(eventId: number, event: Event): Observable<Event> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.put<Event>(url, event).pipe(
      tap((updatedEvent) => console.log('Event updated:', updatedEvent)),
      catchError(this.handleError)
    );
  }

  // Delete an event
  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`).pipe(
      tap(() => console.log('Event deleted:', eventId)),
      catchError(this.handleError)
    );
  }

  // React to an event
  // event.service.ts
reactToEvent(eventId: number, reaction: string): Observable<any> {
  if (!eventId) {
    return throwError(() => new Error('Event ID is undefined or invalid.'));
  }

  const url = `${this.apiUrl}/${eventId}/react`;
  return this.http.post(url, {}, { params: { reaction } }).pipe(
    tap(() => console.log(`Reaction '${reaction}' added to event ID: ${eventId}`)),
    catchError(this.handleError)
  );
}
  // Handle errors
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);

    let errorMessage = 'An error occurred while communicating with the server. Please try again later.';

    if (error.status === 404) {
      errorMessage = 'The requested event was not found.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request. Please check the data sent.';
    } else if (error.status === 500) {
      errorMessage = 'An internal server error occurred.';
    }

    return throwError(() => new Error(errorMessage));
  }
}