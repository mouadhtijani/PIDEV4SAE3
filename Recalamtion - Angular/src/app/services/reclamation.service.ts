// src/app/services/reclamation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Reclamation } from '../reclamation.model'; // Ensure correct import

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8091/api/reclamations'; // Ensure the URL is correct

  constructor(private http: HttpClient) {}

  // Get all reclamations
  getAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error loading reclamations:', error); // Log the error
        return of([]); // Return an empty array if the API request fails
      })
    );
  }

  // Create a new reclamation
  create(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.apiUrl, reclamation).pipe(
      catchError((error) => {
        console.error('Error creating reclamation:', error); // Log the error
        throw error; // Rethrow the error so it can be handled elsewhere
      })
    );
  }

  // Add a response to a reclamation
  addResponse(reclamationId: number, message: string): Observable<Response> {
    const url = `http://localhost:8091/api/responses/${reclamationId}`;
    return this.http.post<Response>(url, { message });
  }

  // Delete a reclamation
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting reclamation:', error); // Log the error
        throw error; // Rethrow the error so it can be handled elsewhere
      })
    );
  }
}
