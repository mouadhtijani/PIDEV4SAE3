import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Event } from '../models/event';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/event/api/events';  // URL de l'API backend

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Réponse du serveur:', data); // Ajoute un log pour vérifier la réponse du backend
      }),
      catchError(this.handleError) // Gestion des erreurs
    );
  }
  

  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`).pipe(
      tap(event => console.log('Données récupérées pour l’événement:', event)),
      catchError(this.handleError)
    );
  }

  updateEvent(eventId: number, event: Event): Observable<Event> {
    const url = `${this.apiUrl}/events/${eventId}`; // Remplacez par l'URL de votre API
    return this.http.put<Event>(url, event); // Utilisez PUT ou PATCH selon votre API
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }
  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${eventId}`);
  }
  
  

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error);
  
    let errorMessage = 'Une erreur s\'est produite lors de la communication avec le serveur. Veuillez réessayer plus tard.';
    
    if (error.status === 404) {
      errorMessage = 'L\'événement demandé n\'a pas été trouvé.';
    } else if (error.status === 400) {
      errorMessage = 'Requête invalide. Veuillez vérifier les données envoyées.';
    } else if (error.status === 500) {
      errorMessage = 'Une erreur interne du serveur s\'est produite.';
    }
  
    return throwError(() => new Error(errorMessage));
  }
}