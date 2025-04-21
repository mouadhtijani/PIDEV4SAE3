import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Chemin relatif corrigé

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createReclamation(reclamation: any) {
    return this.http.post(`${this.apiUrl}/user/reclamations`, reclamation);
  }

  getUserReclamations(userId: string) {
    return this.http.get(`${this.apiUrl}/user/reclamations/${userId}`);
  }

  getAdminReclamations() {
    return this.http.get(`${this.apiUrl}/admin/reclamations`);
  }

  // Nouvelle méthode pour récupérer le QR Code
  getQRCode(reclamationId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/user/reclamations/qr/${reclamationId}`, { responseType: 'blob' });
  }

  updateAdminResponse(id: number, response: string) {
    return this.http.put(`${this.apiUrl}/admin/reclamations/${id}/response`, 
      { response: response } // Envoyer comme objet JSON
    );
  }
}
