import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = 'http://localhost:9090';  // Base URL for your backend

  constructor(private http: HttpClient) { }

  // Set the endpoint dynamically
  setApiUrl(endpoint: string) {
    this.apiUrl = `http://localhost:9090/${endpoint}`;
  }

  // Create a new entity
  createEntity(entity: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entity, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get all entities
  getAllEntities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get an entity by ID
  getEntityById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update an entity by ID
  updateEntity(id: number, entity: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, entity, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete an entity by ID
  deleteEntity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
