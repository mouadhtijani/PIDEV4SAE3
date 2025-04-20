import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HistoryEntry } from '../models/history-entry.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = `${environment.apiUrl}/history`;

  constructor(private http: HttpClient) {}

  getHistory(): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>(this.apiUrl);
  }
}
