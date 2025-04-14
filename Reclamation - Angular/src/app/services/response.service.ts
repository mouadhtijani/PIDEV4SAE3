import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private apiUrl = `${environment.apiUrl}/api/responses`;

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter une réponse à une réclamation
  addResponse(reclamationId: number, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${reclamationId}`, { message });
  }
}
