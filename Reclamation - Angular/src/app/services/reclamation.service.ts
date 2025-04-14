import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = `${environment.apiUrl}/api/reclamations`;

  constructor(private http: HttpClient) {}

  addReclamation(reclamation: any): Observable<any> {
    return this.http.post(this.apiUrl, reclamation);
  }

  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
